# Nextjs store

This is a online-store project built with bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). Other tools used are: TypeScript and Material UI.

[Fake Store API](https://fakestoreapi.com/) was used to fetch sample products and to fetch the exchange rates, [Exchange Rates API](https://exchangeratesapi.io/)


## Getting Started

First, run `yarn install` or `npm install` to get all the packages.

To run the development server:
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The API should run on http://localhost:4000

You would need to add the firebase credentials in this format in `.env.local` file

```
  NEXT_PUBLIC_FIREBASE_API_KEY = "XXXX"
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = "XXXX"
  NEXT_PUBLIC_FIREBASE_PROJECT_ID = "XXXX"
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = "XXXX"
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = "XXXX"
  NEXT_PUBLIC_FIREBASE_APP_ID = "XXXX"
```

## Production

Run `npm run build` or `yarn build`
