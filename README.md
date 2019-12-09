<h1 align="center">
  <img alt="Gympoint" title="Gympoint" src=".github/logo.png" width="200px" />
</h1>

<h3 align="center">
  Desafio final Gympoint: back-end, front-end web e mobile
</h3>

<p align = "center">
<img alt = "Última confirmação do Github" src = "https://img.shields.io/github/last-commit/glayner/gympoint">
<img alt = "Idioma principal do GitHub" src = "https://img.shields.io/github/languages/top/glayner/gympoint">
<img alt = "GitHub" src = "https://img.shields.io/github/license/glayner/gympoint.svg">
</p>  

# :gear:  Back-end

## :hammer_and_wrench: Tecnologias e ferramentas

-  [Node.js][nodejs]
-  [Express](https://expressjs.com/)
-  [nodemon](https://nodemon.io/)
-  [Sucrase](https://github.com/alangpierce/sucrase)
-  [Docker](https://www.docker.com/docker-community)
-  [Sequelize](http://docs.sequelizejs.com/)
-  [PostgreSQL][postgre]
-  [Redis][redis]
-  [JWT](https://jwt.io/)
-  [Bcrypt](https://www.npmjs.com/package/bcrypt)
-  [Youch](https://www.npmjs.com/package/youch)
-  [Yup](https://www.npmjs.com/package/yup)
-  [Bee Queue](https://www.npmjs.com/package/bcrypt)
-  [Nodemailer](https://nodemailer.com/about/)
-  [date-fns](https://date-fns.org/)
-  [Sentry](https://sentry.io/)
-  [DotEnv](https://www.npmjs.com/package/dotenv)
-  [VS Code][vc] with [Editor Config][vceditconfig]
-  [ESLint](https://eslint.org/)
-  [prettier](https://prettier.io/)

## :information_source: How To Use

Para clonar esse app voce precisa [Git](https://git-scm.com), [Node.js v10.16][nodejs] + [Yarn v1.13][yarn]. Para ele poder funcionar precisa de um banco [PostgreSQL][postgre] e [Redis][redis] instalado na maquina.

```bash

$ git clone https://github.com/glayner/gympoint.git

$ cd gympoint/backend

$ yarn

```
Faça uma cópia do arquivo .env.example, renomeie para .env e altere as variáveis de acordo com o seu ambiente.
```bash
$ yarn sequelize db:migrate

$ yarn sequelize db:seed:all

# iniciar servidor da aplicação
$ yarn dev

# em outro terminal iniciar servidor de email
$ yarn queue

```
[nodejs]: https://nodejs.org/
[yarn]: https://yarnpkg.com/
[redis]: https://redis.io/
[postgre]: https://www.postgresql.org/
[vc]: https://code.visualstudio.com/
[vceditconfig]: https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig