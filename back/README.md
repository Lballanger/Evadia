# projet-15-on-demenage

[ReadMe Français](https://github.com/O-clock-Uther/projet-15-on-demenage/blob/back/back/README-FR.md) <!--link to modify-->

[API doc](https://documenter.getpostman.com/view/17789631/UUy67562)

---

## Content

- [projet-15-on-demenage](#projet-15-on-demenage)
  - [Content](#content)
  - [Prerequired](#prerequired)
  - [Get started](#get-started)
  - [Generate migrations](#generate-migrations)
  - [Dependencies](#dependencies)
  - [Dev Dependencies](#dev-dependencies)
  - [Todo](#todo)
  - [License](#license)

## Prerequired

You need to have [node](http://nodejs.org) installed on your machine and [sqitch](https://sqitch.org).

## Get started

1. **Clone & install**

```zsh
git clone git@github.com:O-clock-Uther/projet-15-on-demenage.git
cd back
npm i # or npm install
```

---

2. **Environment Variables**

```bash
cp .env.example .env
```

Add your variables

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

Copy related output to your `.env` file:

```bash
{
  jwt_token: '3901f6e19eb1fe4f98fa626d...',
  jwt_refresh_token: '78a031147c0bd426e54f...'
}
```

1. **Start project**

```bash
# Development
npm run dev

# Production
npm start

# Test
npm run test # or npm test  ||  npm t
```

---

## Generate migrations

:warning: You need to install `Sqitch` on your machine [See](https://sqitch.org/download/)

<details>

<summary>Instructions</summary>

1. Initialize new Sqitch app

```bash
sqitch init <app_name> --target db:pg:<database> --engine pg --top-dir migrations
```

2. Add a migration

```bash
sqitch add <migration_name> -m "your_commit_message"
```

3. Write you migration

```
- migrations
  - deploy
    - <migration_name>.sql
  - revert
    - <migration_name>.sql
  - verify
    - <migration_name>.sql
```

4. Execute migration

**Deploy:**

`sqitch deploy`

**Verify:**

`sqitch verify`

**Revert:**

`sqitch revert`

> For revert one step back: `sqitch revert HEAD^1`

</details>

---

## Dependencies

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

## Dev Dependencies

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
