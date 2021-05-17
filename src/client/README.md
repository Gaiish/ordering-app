### Frontend

#### Set up env variables

Same here, create a `.env` file and copy the content of `.env.example`:

```sh
touch .env
cp .env.example .env
```

Add firebase [web config](https://firebase.google.com/docs/web/setup) credentials from your project; for the `BACKEND_API_URL`, you can use:

- `http://localhost:5000` or
- `https://orderingapp-backend-zypjvigopq-lm.a.run.app`

```env
BACKEND_API_URL=https://orderingapp-backend-zypjvigopq-lm.a.run.app
FIREBASE_API_KEY=
FIREBASE_AUTH_DOMAIN=
FIREBASE_DATABASE_URL=
FIREBASE_PROJECT_ID=
FIREBASE_STORAGE_BUCKET=
FIREBASE_MESSAGING_SENDER_ID=
FIREBASE_APP_ID=
```

#### Install dependencies

```sh
yarn install
```

#### Run

```sh
yarn dev
```

> Running on http://localhost:3000
