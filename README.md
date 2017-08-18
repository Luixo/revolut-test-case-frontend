# revolut-test-case-frontend

Revolut frontend test case based on [demo video](https://www.youtube.com/watch?v=c0zPSiKYipc&t=29s).

### Installation

```bash
git clone https://github.com/luixo/revolut-test-case-frontend.git
```

### Development & demo run

Checkout [revolut-test-case-frontend](https://github.com/luixo/revolut-test-case-frontend) and run `yarn install && npm start`, then visit `http://localhost:5000`.

### Production

To run real requests to [openexchangerates.org](openexchangerates.org) create an `.env` file with given content. To switch back to fake requesting delete the `NOVE_ENV` variable or put `development` in it.
```
OPENEX_API_KEY=ffffffffffffffffffffffffffffffFf
NODE_ENV=production
```

### Standalone setup
Run `npm run build` from the project directory, copy `dist` contents to your project and `import Widget from '..somepath/Widget'`. You can use `Widget` as a React component.

### Widget attributes

| Property | Type | Description |
| ---- | ---- | ---- |
| apiKey | string | A key to Open Exchange Rates API |
| user | `object({ cash: [{ code:String, amount:Number },..], favourites: [{ from:String, to:String },..])` | Initializing user object  |
| onChangeCash | `function({ code:String, amount:Number })` | Invoked with argument as object describing new amount of user wallet with given code.|
| onChangeFavourites | `function({ from:String, to: String }, index:Number)` | Invoked with first argument describing new favourites pair and index as second argument |
| onExit | function | Invoked on exit from widget or successful exchange, without arguments |