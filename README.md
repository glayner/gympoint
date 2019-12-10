<h1 align="center">
  <img alt="Gympoint" title="Gympoint" src=".github/logo.png" width="200px" />
</h1>

<h3 align="center">
  Desafio final Gympoint: back-end, front-end web e mobile
</h3>

<p align = "center">
<a href="https://www.codefactor.io/repository/github/glayner/gympoint"><img src="https://www.codefactor.io/repository/github/glayner/gympoint/badge" alt="CodeFactor" /></a>
<img alt = "Última confirmação do Github" src = "https://img.shields.io/github/last-commit/glayner/gympoint">
<img alt = "Idioma principal do GitHub" src = "https://img.shields.io/github/languages/top/glayner/gympoint">
<img alt = "GitHub" src = "https://img.shields.io/github/license/glayner/gympoint.svg">
</p>  

## :gear:  Back-end

### :information_source: Instruções Back-end

Para clonar esse app voce precisa [Git](https://git-scm.com), [Node.js v10.16](https://nodejs.org/) + [Yarn v1.13](https://yarnpkg.com/). Para ele poder funcionar precisa de um banco [PostgreSQL](https://www.postgresql.org/) e [Redis](https://redis.io/) instalado e rodando na maquina <details><summary>podendo utilizar o [Docker](https://www.docker.com/).</summary>
```bash
# instalar Redis
docker run --name redisgympoint -p 6379:6379 -d -t redis:alpine

# inicializar Redis
docker start redisgympoint

# instalar PostgreSQL
docker run --name database -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres:11

# inicializar PostgreSQL
docker start database
```
</details>



```bash
# clone o arquivo do repositório
git clone https://github.com/glayner/gympoint.git

# entrar na pasta do back-end
cd gympoint/backend

#instalar os pacotes e dependencias
yarn

```
Faça uma cópia do arquivo .env.example, renomeie para .env e altere as variáveis de acordo com o seu ambiente.
```bash
# criar estrutura do banco de dados Postgres
yarn sequelize db:migrate

# povoar o banco de dados
yarn sequelize db:seed:all

# iniciar servidor da aplicação
yarn dev

# em outro terminal iniciar servidor de email
yarn queue

```
---
## :computer: Front-end
<blockquote>testado no Google Chrome </blockquote>

### :information_source: Instruções Front-end

```bash
# entrar na pasta do front-end
cd gympoint/frontend

#instalar os pacotes e dependencias
yarn

# inicializar a aplicação web
yarn start
```
---

## :iphone: Mobile
<blockquote> testado no ANDROID </blockquote>

### :information_source: Instruções Mobile
```bash
# entrar na pasta do mobile
cd gympoint/mobile

#instalar os pacotes e dependencias
yarn
```
alterar o baseURL em gympoint/mobile/src/services/api.js colocando o ip local como no .env do back-end
```bash
# inicializar a aplicação web
react-native run-android
```
obs: caso não inicie automaticamente rotar "react-native start" e se ficar só uma tela branca rodar o "react-native run-android" novamente em outro terminal enquanto o start está rodando.