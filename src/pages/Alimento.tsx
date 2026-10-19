import { useEffect, useState } from 'react'
import { api, type Alimento as AlimentoDto, type AlimentoEquivalente, type Categoria } from '../lib/api'
import { Container } from '../components/container/Container'
import { InputSelect } from '../components/InputSelect/InputSelect'
import { Table } from '../components/Table/Table'

export function Alimento() {
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [alimentos, setAlimentos] = useState<AlimentoDto[]>([])
  const [equivalentes, setEquivalentes] = useState<AlimentoEquivalente[]>([])
  const [categoriaId, setCategoriaId] = useState('')
  const [alimentoId, setAlimentoId] = useState('')
  const [gramas, setGramas] = useState('100')
  const [loadingCategorias, setLoadingCategorias] = useState(true)
  const [loadingAlimentos, setLoadingAlimentos] = useState(false)
  const [loadingEquivalentes, setLoadingEquivalentes] = useState(false)
  const [error, setError] = useState('')

  const alimentoSelecionado = alimentos.find((alimento) => alimento.id === Number(alimentoId))
  const quantidade = Number(gramas.replace(',', '.'))

  useEffect(() => {
    let active = true
    api.categorias()
      .then((data) => { if (active) setCategorias(data) })
      .catch((cause: unknown) => { if (active) setError(cause instanceof Error ? cause.message : 'Não foi possível carregar as categorias.') })
      .finally(() => { if (active) setLoadingCategorias(false) })
    return () => { active = false }
  }, [])

  useEffect(() => {
    if (!categoriaId) {
      return
    }
    let active = true
    api.alimentos(Number(categoriaId))
      .then((data) => { if (active) setAlimentos(data) })
      .catch((cause: unknown) => { if (active) setError(cause instanceof Error ? cause.message : 'Não foi possível carregar os alimentos.') })
      .finally(() => { if (active) setLoadingAlimentos(false) })
    return () => { active = false }
  }, [categoriaId])

  useEffect(() => {
    if (!alimentoId || !Number.isFinite(quantidade) || quantidade <= 0) {
      return
    }
    let active = true
    const timer = window.setTimeout(() => {
      api.equivalentes(Number(alimentoId), quantidade)
        .then((data) => { if (active) setEquivalentes(data) })
        .catch((cause: unknown) => { if (active) setError(cause instanceof Error ? cause.message : 'Não foi possível calcular as substituições.') })
        .finally(() => { if (active) setLoadingEquivalentes(false) })
    }, 300)
    return () => {
      active = false
      window.clearTimeout(timer)
    }
  }, [alimentoId, quantidade])

  function formatar(valor: number) {
    return new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 1 }).format(valor)
  }

  return (
    <main className="page-shell">
      <header className="page-header">
        <p className="eyebrow">Ana Carolina - Nutricionista</p>
        <h1>Substituição de alimentos</h1>
        <p>Informe o alimento e a porção. A tabela calcula opções do mesmo grupo com valor energético equivalente.</p>
      </header>

      <section className="panel" aria-label="Seleção do alimento e da porção">
        <Container direction="row">
          <InputSelect
            id="categoria"
            label="Categoria"
            value={categoriaId}
            disabled={loadingCategorias}
            placeholder={loadingCategorias ? 'A carregar categorias…' : 'Selecione uma categoria'}
            options={categorias.map((categoria) => ({ value: categoria.id, label: categoria.descricao }))}
            onChange={(value) => {
              setCategoriaId(value)
              setAlimentoId('')
              setAlimentos([])
              setEquivalentes([])
              setLoadingAlimentos(Boolean(value))
              setLoadingEquivalentes(false)
              setError('')
            }}
          />
          <InputSelect
            id="alimento"
            label="Alimento consumido"
            value={alimentoId}
            disabled={!categoriaId || loadingAlimentos}
            placeholder={loadingAlimentos ? 'A carregar alimentos…' : 'Selecione um alimento'}
            options={alimentos.map((alimento) => ({ value: alimento.id, label: alimento.descricao }))}
            onChange={(value) => {
              setAlimentoId(value)
              setEquivalentes([])
              setLoadingEquivalentes(Boolean(value) && Number.isFinite(quantidade) && quantidade > 0)
              setError('')
            }}
          />
          <label className="grams-field" htmlFor="gramas">
            Quantidade consumida (g)
            <input
              id="gramas"
              type="number"
              min="0.1"
              step="any"
              inputMode="decimal"
              value={gramas}
              onChange={(event) => {
                const value = event.target.value
                const parsed = Number(value.replace(',', '.'))
                setGramas(value)
                setEquivalentes([])
                setLoadingEquivalentes(Boolean(alimentoId) && Number.isFinite(parsed) && parsed > 0)
                setError('')
              }}
              disabled={!alimentoId}
            />
            {alimentoId && (!Number.isFinite(quantidade) || quantidade <= 0) && <span className="field-error">Informe uma quantidade maior que zero.</span>}
          </label>
        </Container>
        {error && <p className="error-message" role="alert">{error}</p>}
      </section>

      {alimentoSelecionado && (
        <section className="panel result-panel" aria-live="polite">
          <div className="result-heading">
            <div>
              <p className="eyebrow">Alternativas com energia equivalente a {formatar(quantidade > 0 ? quantidade : 0)} g de</p>
              <h2>{alimentoSelecionado.descricao}</h2>
            </div>
           
          </div>
          {!Number.isFinite(quantidade) || quantidade <= 0
            ? <p className="muted">Informe uma quantidade válida para calcular as substituições.</p>
            : loadingEquivalentes
              ? <p className="muted" role="status">A calcular substituições…</p>
              : <Table alimentos={equivalentes} formatar={formatar} />}
          <p className="table-note">As quantidades são calculadas pela equivalência de energia (kcal) e incluem apenas alimentos do(s) mesmo(s) grupo(s).</p>
        </section>
      )}
    </main>
  )
}
