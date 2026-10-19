import type { AlimentoEquivalente } from '../../lib/api'
import { TableSt, TBodySt, TheadSt } from './Table.styled'

type TableProps = {
  alimentos: AlimentoEquivalente[]
  formatar: (valor: number) => string
}

export function Table({ alimentos, formatar }: TableProps) {
  return (
    <TableSt>
      <TheadSt>
        <tr>
          <th scope="col">Alimento substituto</th>
          <th scope="col">Quantidade</th>
          <th scope="col">Energia nessa porção</th>
        </tr>
      </TheadSt>
      <TBodySt>
        {alimentos.map((alimento) => (
          <tr key={alimento.id}>
            <th scope="row">{alimento.nome}</th>
            <td>{formatar(alimento.quantidadeGramas)} g</td>
            <td>{formatar(alimento.energia)} kcal</td>
          </tr>
        ))}
        {alimentos.length === 0 && (
          <tr><td colSpan={3}>Não foram encontrados substitutos com energia disponível neste grupo.</td></tr>
        )}
      </TBodySt>
    </TableSt>
  )
}
