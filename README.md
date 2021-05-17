# Ordering app

> Orders management app built with ExpressJs and firebase on the backend, and NextJs on the frontend.

Frontend deployed on Vercel: https://ordering-app.vercel.app/

Backend deployed on Cloud Run: https://orderingapp-backend-zypjvigopq-lm.a.run.app

## How to use

Clone the repo:

```sh
git clone https://github.com/Gaiish/ordering-app.git

cd ordering-app
```

### Backend

```sh
cd src/server
```

#### Set up env variables

First we need to set up the env variables used in the project.

Create a `.env` file and add the content of `.env.example` into it.

```sh
touch .env
cp .env.example .env
```

Add [service account credentials](https://firebase.google.com/docs/admin/setup) from your firebase project:

```env
FIREBASE_PROJECT_ID=
FIREBASE_PRIVATE_KEY=
FIREBASE_CLIENT_EMAIL=
FIREBASE_DATABASE_URL=
```

#### Install dependencies

```sh
yarn install
```

#### Run

```sh
yarn dev
```

> Will be running on http://locahost:5000

### Frontend

```sh
cd src/client
```

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
