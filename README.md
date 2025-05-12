# Cubos Movies 🎬

Aplicação fullstack para cadastro, edição, visualização e exclusão de filmes.
com autenticação, busca, filtros e envio de e-mail na data de estreia de filmes futuros.

## Tecnologias

* **Backend**: NestJS (TypeScript)
* **ORM**: TypeORM
* **Banco de dados**: PostgreSQL
* **Frontend**: React (Vite + React + Tailwind CSS + TypeScript)
* **Armazenamento de imagens**: AWS S3
* **Envio de e-mails**: Resend
* **Containerização**: Docker & Docker Compose (opcional)

## Pré-requisitos

* Node.js >= 18
* npm ou Yarn
* Docker & Docker Compose (se optar por rodar em containers)

## Configuração de ambiente

1. Copie o arquivo de exemplo de variáveis de ambiente na raiz do projeto:

   ```bash
   cp .env.example .env
   ```
2. Preencha as variáveis no `.env`:

   ```dotenv
   DATABASE_URL=postgres://<USUÁRIO>:<SENHA>@localhost:5432/<NOME_DO_BANCO>
   FRONTEND_URL=http://localhost:4173
   JWT_SECRET=<SEGREDO_PARA_JWT>
   AWS_S3_BUCKET=<NOME_DO_BUCKET>
   AWS_REGION=<REGIÃO_AWS>
   AWS_ACCESS_KEY_ID=<SEU_ACCESS_KEY_ID>
   AWS_SECRET_ACCESS_KEY=<SEU_SECRET_ACCESS_KEY>
   RESEND_API_KEY=<SUA_CHAVE_RESEND>
   FROM_EMAIL=<EMAIL_REMETENTE>
   ```

## Executando localmente (sem Docker)

### Backend

1. Acesse a pasta do servidor:

   ```bash
   cd apps/server
   ```
2. Instale as dependências:

   ```bash
   npm install
   ```
3. Execute as migrations:

   ```bash
   npm run migration:run
   ```
4. Inicie a aplicação em modo de desenvolvimento:

   ```bash
   npm run start:dev
   ```

### Frontend

1. Acesse a pasta do cliente:

   ```bash
   cd apps/client
   ```
2. Instale as dependências:

   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```
4. Abra no navegador em `http://localhost:4173`

## Executando com Docker Compose

Na raiz do projeto, execute:

```bash
docker-compose up --build
```

Isso vai subir os seguintes serviços:

* **postgres**: container PostgreSQL
* **backend**: NestJS (porta 3000) com migrations aplicadas automaticamente
* **frontend**: React (porta 4173)

Para parar os containers, use:

```bash
docker-compose down
```

## Scripts úteis

* **Backend** (na pasta `apps/server`):

  * `npm run build` - Compila o projeto
  * `npm run start:prod` - Roda a versão compilada
  * `npm run migration:run` - Aplica migrations
  * `npm run start:dev` - Modo de desenvolvimento

* **Frontend** (na pasta `apps/client`):

  * `npm run dev` - Inicia servidor de desenvolvimento
  * `npm run build` - Gera build de produção
  * `npm run preview` - Pré-visualiza o build

## Estrutura de pastas

```
├── apps
│   ├── client    # Frontend React
│   └── server    # Backend NestJS
├── docker-compose.yml
├── .env.example
└── README.md
```

## Observações

* Certifique-se de que as credenciais AWS configuradas no `.env` tenham permissão de escrita no bucket informado.
* Ajuste o `FRONTEND_URL` e o `DATABASE_URL` conforme seu ambiente local.
* No modo Docker, o backend espera o Postgres estar disponível antes de aplicar migrations.

---

*Feito com NestJS, React e Docker.*
