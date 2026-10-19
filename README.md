# Nutri frontend

Frontend React + TypeScript para consultar alimentos da API Spring Boot do projeto `nutri`.

## Desenvolvimento

1. Inicie o backend em `http://localhost:8080` (ou defina `VITE_BACKEND_URL`).
2. Copie `.env.example` para `.env.local` se precisar personalizar as URLs.
3. Execute `npm run dev`.

O Vite encaminha `/api` para o backend. `VITE_API_BASE_URL` define a base usada pelo browser e, por padrão, é `/api`.

## Endpoints consumidos

- `GET /api/categorias` — categorias (`id`, `descricao`).
- `GET /api/alimentos/{categoriaId}` — alimentos da categoria e respetivos valores nutricionais.
- `GET /api/alimentos/{id}/grupos` — códigos de todos os grupos associados ao alimento.
- `GET /api/alimentos/{id}/equivalentes?gramas={quantidade}` — alimentos dos mesmos grupos com energia equivalente, quantidade em gramas e energia da porção.

Os campos nutricionais nulos aparecem como “Sem informação”; não são convertidos em zero. As substituições excluem o próprio alimento selecionado e alimentos sem energia positiva disponível.

Em produção, configure `VITE_API_BASE_URL` para a base acessível pelo browser ou sirva o frontend e a API sob a mesma origem. A configuração de proxy do Vite aplica-se apenas ao servidor de desenvolvimento.

## Publicar como site estático no Render

O `render.yaml` configura o build com `npm ci && npm run build` e publica `dist`. Envie este projeto para um repositório GitHub, crie um Blueprint no Render e informe `VITE_API_BASE_URL` com a URL pública do backend seguida de `/api` (por exemplo, `https://nutri-api.onrender.com/api`). Essa variável é aplicada durante o build do frontend.
