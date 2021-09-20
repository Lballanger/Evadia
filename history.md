# Initialisation Eslint + Prettier + Husky

```bash
mkdir front
mkdir back
npm init
```

```bash
cd front
npm init vite@latest .
```

```bash
cd ../back
npm init

npx eslint --init
npm i -D eslint-config-prettier eslint-plugin-prettier prettier
```

Mise en place des scripts à la racine et dans le dossier back

```bash
npm run prepare

npx husky add .husky/pre-commit "npm run lint:back && git add -A"
```

```bash
cd ../front

npx eslint --init
npm i -D eslint-config-prettier eslint-plugin-prettier prettier
```

Mise en place des scripts à la racine et dans le dossier front

```bash
npm run prepare

npx husky add .husky/pre-commit "npm run lint:front && git add -A"
```

Ajout des scripts dans le package.json à la racine du projet

```
"lint:back": "cd ./back && npm run lint",
"lint:front": "cd ./front && npm run lint"
```
