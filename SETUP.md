# Setup do projeto — walletz-med-api

Guia para rodar a API na sua máquina pela primeira vez. Siga os passos na ordem.
Leva uns 20–30 minutos.

---

## 1. Instale os programas

| Programa | Onde baixar | Observação |
|---|---|---|
| **Git** | https://git-scm.com/downloads | Instalação padrão (next, next, finish). |
| **Node.js 24 (LTS)** | https://nodejs.org | Escolha a versão marcada como **LTS**. |
| **VS Code** | https://code.visualstudio.com | Editor de código. |
| **PostgreSQL** | veja o passo 2 | Banco de dados. |

Depois de instalar, **feche e abra de novo o terminal** e confira:

```bash
git --version
node -v      # deve mostrar v24.x.x
npm -v
```

Se algum comando der "não reconhecido", reinicie o computador e tente de novo.

---

## 2. Banco de dados (escolha UMA opção)

### Opção A — Com Docker (recomendado se você já tem Docker)

1. Instale o **Docker Desktop**: https://www.docker.com/products/docker-desktop
2. Abra o Docker Desktop e espere ele ficar "running".
3. Pronto — o banco sobe no passo 4.

### Opção B — PostgreSQL instalado no PC

1. Baixe em https://www.postgresql.org/download/windows/
2. Na instalação:
   - Defina uma **senha** para o usuário `postgres` e **anote**.
   - Deixe a porta **5432**.
3. Não precisa criar banco nenhum — o projeto cria sozinho.

---

## 3. Baixe o projeto

No terminal, vá até a pasta onde quer guardar o código e rode:

```bash
git clone https://github.com/walletzcorp-corp/walletz-med-api.git
cd walletz-med-api
code .
```

O último comando abre o projeto no VS Code. Use o terminal do VS Code
(menu **Terminal → New Terminal**) para os próximos passos.

---

## 4. Configure e rode

### 4.1 Instale as dependências

```bash
npm install
```

### 4.2 Crie o arquivo de configuração

```bash
cp .env.example .env
```

- **Se escolheu Docker (Opção A):** não precisa mudar nada. Suba o banco:

  ```bash
  docker compose up -d
  ```

- **Se escolheu PostgreSQL no PC (Opção B):** abra o arquivo `.env` e troque a
  linha `DATABASE_URL` pela abaixo, colocando **a sua senha** e a porta **5432**:

  ```env
  DATABASE_URL=postgresql://postgres:SUA_SENHA@localhost:5432/walletzmed?schema=walletzmed
  ```

> ⚠️ O arquivo `.env` tem senhas. Ele **não** vai para o Git — nunca o envie
> para ninguém nem faça commit dele.

### 4.3 Prepare o banco

```bash
npm run prisma:generate
npm run prisma:deploy
```

O segundo comando cria o banco e as tabelas. No final deve aparecer
**"All migrations have been successfully applied."**

### 4.4 Rode a API

```bash
npm run dev
```

Quando aparecer `walletz-med-api rodando em http://localhost:3000`, está funcionando.

---

## 5. Teste se deu certo

Abra no navegador: **http://localhost:3000/api**

Você verá o **Swagger** (a documentação da API). Para testar:

1. Clique em **POST /tenants** → **Try it out** → **Execute**.
2. Deve voltar o código **201** com os dados criados.
3. Clique em **GET /tenants** → **Try it out** → **Execute** — o registro criado aparece na lista.

Rode também os testes automatizados:

```bash
npm test
```

🎉 Setup concluído!

---

## No dia a dia

```bash
git pull                  # pega as últimas mudanças
npm install               # caso alguém tenha adicionado dependências
npm run prisma:deploy     # caso alguém tenha criado tabelas novas
npm run dev               # roda a API
```

Com Docker, lembre de abrir o Docker Desktop e rodar `docker compose up -d` se o banco estiver parado.

Para parar a API: `Ctrl + C` no terminal.

---

## Deu erro? 🔧

| Erro | O que fazer |
|---|---|
| `'node' não é reconhecido` | Reinstale o Node e **reinicie o PC**. |
| `P1001: Can't reach database server` | O banco não está rodando. Docker: abra o Docker Desktop e rode `docker compose up -d`. PostgreSQL no PC: abra `services.msc` e inicie o serviço `postgresql-x64-...`. |
| `P1000: Authentication failed` | Senha errada no `DATABASE_URL` do `.env`. |
| `Port 3000 is already in use` / `EADDRINUSE` | A API já está rodando em outro terminal. Feche-o com `Ctrl + C`. |
| `Cannot find module '@prisma/client'` ou erros de tipo do Prisma | Rode `npm run prisma:generate`. |
| Senha com `@`, `#`, `%` ou `/` no `.env` | Troque o caractere: `@` → `%40`, `#` → `%23`, `%` → `%25`, `/` → `%2F`. |

Travou por mais de 15 minutos? Peça ajuda no time e mande **print do erro completo**. 🙂

---

## Comandos úteis

| Comando | Para que serve |
|---|---|
| `npm run dev` | Roda a API (reinicia sozinha ao salvar arquivos). |
| `npm test` | Roda os testes. |
| `npm run prisma:studio` | Abre uma tela no navegador para ver os dados do banco. |
| `docker compose down` | Para o banco (Docker). Os dados não são apagados. |
