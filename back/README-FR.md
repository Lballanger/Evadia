# projet-15-on-demenage

[ReadMe English](https://github.com/O-clock-Uther/projet-15-on-demenage/blob/back/back/README.md) <!--link to modify-->

[API doc](https://documenter.getpostman.com/view/17789631/UUy67562)

---

## Contenue

- [projet-15-on-demenage](#projet-15-on-demenage)
  - [Contenue](#contenue)
  - [Prerequis](#prerequis)
  - [Mise en place](#mise-en-place)
  - [Générer des migrations](#générer-des-migrations)
  - [Dependences](#dependences)
  - [Dev Dependences](#dev-dependences)
  - [Todo](#todo)
  - [License](#license)

## Prerequis

Vous avez besoin de [node](http://nodejs.org) installé sur votre machine ainsi que [sqitch](https://sqitch.org).

## Mise en place

1. **Clone & installe**

```zsh
git clone git@github.com:O-clock-Uther/projet-15-on-demenage.git
cd back
npm i # ou npm install
```

---

2. **Variables d'environnements**

```bash
cp .env.example .env
```

Ajouter vos variables

```conf
PORT=3500
DATABASE_URL=postgresql//<username>:<password>@<host>/<database>
JWT_SECRET=
JWT_SECRET_DURATION=1200
JWT_REFRESH_SECRET=
JWT_REFRESH_SECRET_DURATION=
NODEMAILER_PASSWORD=
REDIS_URL=redis://<username>:<password>@<host>:<port>
```

Copier le nécessaire dans votre fichier `.env` :

```bash
{
  jwt_token: '3901f6e19eb1fe4f98fa626d...',
  jwt_refresh_token: '78a031147c0bd426e54f...'
}
```

1. **Démarrer le projet**

```bash
# Développement
npm run dev

# Production
npm start

# Test
npm run test # ou npm test  ||  npm t
```

---

## Générer des migrations

:warning: Vous avez besoin de `Sqitch` sur votre machine [See](https://sqitch.org/download/)

<details>

<summary>Instructions</summary>

1. Initialiser votre application Sqitch

```bash
sqitch init <nom_app> --target db:pg:<database> --engine pg --top-dir migrations
```

2. Ajouter une migration

```bash
sqitch add <nom_de_la_migration> -m "votre_message_de_commit"
```

1. Ecrivez votre migration

```
- migrations
  - deploy
    - <nom_de_la_migration>.sql
  - revert
    - <nom_de_la_migration>.sql
  - verify
    - <nom_de_la_migration>.sql
```

4. Lancer votre migration

**Déployer:**

`sqitch deploy`

**Vérifier:**

`sqitch verify`

**Supprimer:**

`sqitch revert`

> Pour supprimer la dernière étape : `sqitch revert HEAD^1`

</details>

---

## Dependences

| Name         | Version   |                                                |
| ------------ | --------- | ---------------------------------------------- |
| bcryptjs     | `^5.0.1`  | [link](https://npmjs.org/package/bcrypt)       |
| cors         | `^2.8.5`  | [link](https://npmjs.org/package/cors)         |
| dotenv       | `^10.0.0` | [link](https://npmjs.org/package/dotenv)       |
| express      | `^4.17.1` | [link](https://npmjs.org/package/express)      |
| joi          | `^17.4.2` | [link](https://npmjs.org/package/joi)          |
| jsonwebtoken | `^8.5.1`  | [link](https://npmjs.org/package/jsonwebtoken) |
| nodemailer   | `^6.6.5`  | [link](https://npmjs.org/package/nodemailer)   |
| pg           | `^8.7.1`  | [link](https://npmjs.org/package/pg)           |
| redis        | `^3.1.2`  | [link](https://npmjs.org/package/redis)        |

## Dev Dependences

| Name                      | Version   |                                                             |
| ------------------------- | --------- | ----------------------------------------------------------- |
| eslint                    | `^7.32.0` | [link](https://npmjs.org/package/eslint)                    |
| eslint-config-airbnb-base | `^14.2.1` | [link](https://npmjs.org/package/eslint-config-airbnb-base) |
| eslint-config-prettier    | `^8.3.0`  | [link](https://npmjs.org/package/eslint-config-prettier)    |
| eslint-plugin-import      | `^2.24.2` | [link](https://npmjs.org/package/eslint-plugin-import)      |
| eslint-plugin-prettier    | `^4.0.0`  | [link](https://npmjs.org/package/eslint-plugin-prettier)    |
| husky                     | `^7.0.2`  | [link](https://npmjs.org/package/husky)                     |
| jest                      | `^27.2.4` | [link](https://npmjs.org/package/jest)                      |
| node-fetch                | `^3.0.0`  | [link](https://npmjs.org/package/node-fetch)                |
| nodemon                   | `^2.0.12` | [link](https://npmjs.org/package/nodemon)                   |
| prettier                  | `^2.4.1`  | [link](https://npmjs.org/package/prettier)                  |
| stream-json               | `^1.7.3`  | [link](https://npmjs.org/package/stream-json) ?             |
| supertest                 | `^6.1.6`  | [link](https://npmjs.org/package/supertest)                 |

---

## Todo

- [x] Initialize project
- [ ] Create migrations
  - [ ] Weather
  - [ ] Hospital ?
  - [ ] ...
- [ ] Create test
- [ ] ...

## License

MIT
