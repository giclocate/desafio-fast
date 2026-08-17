# Desafio Fast - Workshop API + Frontend

Este repositório reúne uma solução completa para o desafio técnico de gestão de workshops, colaboradores e presença.

A aplicação possui:
- Backend em ASP.NET Core
- Banco relacional com Entity Framework Core
- Autenticação JWT
- Swagger para documentação e testes
- Frontend em React + Vite para consumo da API

## Objetivo do projeto

O sistema permite:
- cadastrar, listar, editar e excluir workshops
- cadastrar, listar, editar e excluir colaboradores
- registrar a presença de colaboradores nos workshops
- consumir a API por meio de uma interface web
- autenticar usuários com token JWT

## Stack tecnológica

### Backend
- C#
- .NET 8
- ASP.NET Core Web API
- Entity Framework Core
- SQL Server / LocalDB
- JWT Bearer
- Swagger / Swashbuckle

### Frontend
- React
- Vite
- React Router
- TanStack Query
- CSS moderno

---

## Estrutura do projeto

```text
desafio-fast/
├── backend/
│   ├── src/
│   │   ├── Data/
│   │   │   └── AppDbContext.cs
│   │   ├── WorkshopApi/
│   │   │   ├── Controllers/
│   │   │   │   ├── AuthController.cs
│   │   │   │   ├── ColaboradoresController.cs
│   │   │   │   └── WorkshopsController.cs
│   │   │   ├── Models/
│   │   │   │   ├── Colaborador.cs
│   │   │   │   └── Workshop.cs
│   │   │   ├── Services/
│   │   │   │   └── JwtTokenService.cs
│   │   │   ├── Program.cs
│   │   │   ├── appsettings.json
│   │   │   ├── appsettings.Development.json
│   │   │   └── WorkshopApi.csproj
│   │   └── 
│   └── tests/
│       └── WorkshopApi.Tests/
│           └── JwtTokenServiceTests.cs
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   └── README.md
│
├── README.md
└── .gitignore
```

---

## Requisitos para rodar localmente

### Backend
- .NET 8 SDK instalado
- SQL Server LocalDB ou SQL Server disponível

### Frontend
- Node.js 18+ recomendado
- npm ou npm.cmd no Windows

> Em ambientes Windows com política de execução do PowerShell, pode ser necessário utilizar `npm.cmd` em vez de `npm`.

---

## 1) Backend - Configuração e execução

### 1.1 Acesse a pasta do backend

```bash
cd backend
```

### 1.2 Restaure os pacotes

```bash
dotnet restore
```

### 1.3 Rode a API

```bash
cd src/WorkshopApi
dotnet run
```

### 1.4 URL da API

A API será iniciada em:

```text
https://localhost:7171
```

O Swagger estará disponível em:

```text
https://localhost:7171/
```

> O projeto configura a UI do Swagger na raiz da aplicação, então ao abrir a URL base você acessa a documentação interativa.

---

## 2) Configuração do banco

A API usa SQL Server/LocalDB por padrão. O arquivo de configuração fica em:

```text
backend/src/WorkshopApi/appsettings.json
```

Exemplo:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=WorkshopDb;Trusted_Connection=True;TrustServerCertificate=True;MultipleActiveResultSets=true"
  },
  "Jwt": {
    "Key": "desafio-fast-dev-key-1234567890",
    "Issuer": "WorkshopApi",
    "Audience": "WorkshopApiUsers"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*"
}
```

O banco é criado automaticamente em tempo de execução pela aplicação.

---

## 3) Autenticação JWT

Todos os endpoints de workshop e colaboradores exigem autenticação.

### 3.1 Login

Endpoint:

```http
POST /api/auth/login
```

Body:

```json
{
  "username": "admin",
  "password": "admin123"
}
```

Resposta esperada:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 3.2 Como usar o token no Swagger

1. Acesse o Swagger em `https://localhost:7171/`
2. Chame `POST /api/auth/login`
3. Copie o valor do campo `token`
4. Clique no botão `Authorize`
5. No campo de autorização, informe:

```text
Bearer <token>
```

Depois disso, os endpoints protegidos passam a funcionar normalmente.

---

## 4) Endpoints da API

### Auth

#### POST /api/auth/login
Autentica o usuário e retorna um token JWT.

---

### Workshops

#### GET /api/workshops
Lista todos os workshops.

#### GET /api/workshops/{id}
Busca um workshop por ID.

#### POST /api/workshops
Cria um workshop.

Exemplo de payload:

```json
{
  "nome": "Workshop de API REST",
  "dataRealizacao": "2026-08-20T10:00:00",
  "descricao": "Sessão prática sobre APIs REST e boas práticas."
}
```

#### PUT /api/workshops/{id}
Atualiza um workshop existente.

#### DELETE /api/workshops/{id}
Remove um workshop.

#### GET /api/workshops/{id}/colaboradores
Lista os colaboradores presentes no workshop.

#### POST /api/workshops/{id}/presenca
Associa um colaborador a um workshop.

Exemplo:

```json
{
  "colaboradorId": 1
}
```

#### DELETE /api/workshops/{id}/presenca/{colaboradorId}
Remove a presença de um colaborador no workshop.

---

### Colaboradores

#### GET /api/colaboradores
Lista todos os colaboradores.

#### GET /api/colaboradores/{id}
Busca um colaborador por ID.

#### POST /api/colaboradores
Cria um colaborador.

Exemplo:

```json
{
  "nome": "Maria Souza"
}
```

#### PUT /api/colaboradores/{id}
Atualiza os dados do colaborador.

#### DELETE /api/colaboradores/{id}
Remove um colaborador.

---

## 5) Frontend - Execução e integração

### 5.1 Acesse a pasta do frontend

```bash
cd frontend
```

### 5.2 Instale as dependências

```bash
npm install
```

Se no Windows houver problema com `npm` por política de execução do PowerShell, use:

```bash
npm.cmd install
```

### 5.3 Rode o frontend localmente

```bash
npm run dev
```

ou:

```bash
npm.cmd run dev
```

O Vite geralmente abre em:

```text
http://localhost:5173
```

---

## 6) Configuração do frontend para consumir a API

O frontend usa as variáveis de ambiente do Vite.

No arquivo do frontend, o código verifica a variável:

```ts
import.meta.env.VITE_API_BASE_URL
```

Se não for informada, o valor padrão é:

```text
/api
```

Para conectar ao backend local, crie um arquivo `.env` dentro da pasta `frontend` com:

```env
VITE_USE_MOCK=false
VITE_API_BASE_URL=https://localhost:7171/api
```

### Importante
- `VITE_USE_MOCK=false` faz o frontend consumir a API real
- `VITE_API_BASE_URL` aponta para o backend ASP.NET Core

Se quiser usar mock data em vez da API, deixe como padrão ou configure:

```env
VITE_USE_MOCK=true
```

---

## 7) Fluxo de uso recomendado

### Para testar o backend
1. Inicie a API backend
2. Acesse Swagger em `https://localhost:7171/`
3. Faça login em `/api/auth/login`
4. Copie o token
5. Autorize no Swagger com `Bearer <token>`
6. Teste os endpoints protegidos

### Para testar o frontend
1. Inicie o backend
2. Inicie o frontend
3. Configure o `.env` com a URL da API
4. Acesse `http://localhost:5173`
5. Navegue pelas páginas de workshops e colaboradores

---

## 8) Observações importantes

- O frontend vem com opção de mock por padrão para facilitar desenvolvimento inicial.
- Para consumir a API real, é necessário desativar o mock.
- A autenticação é obrigatória nos endpoints protegidos.
- O banco é criado automaticamente caso ainda não exista.

---

## 9) Validação do projeto

O backend possui testes básicos para confirmar a geração de token JWT.

Para executar os testes do backend:

```bash
cd backend
dotnet test
```

---

## 10) Próximos passos e melhorias

- Finalizar a tela de Dashboard
- separar DTOs em arquivos próprios
- melhorar a autenticação com usuários e roles persistidos no banco
- criar testes de integração para os endpoints HTTP
---

## Conclusão

Este projeto entrega uma solução completa de API e frontend para gestão de workshops e presença de colaboradores, com:
- CRUD funcional
- autenticação JWT
- documentação via Swagger
- interface web para interação do usuário
