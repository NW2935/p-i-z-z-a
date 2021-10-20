# PIZZA

This app provides an interface for users to interact with a [fictional pizza ordering service](https://order-pizza-api.herokuapp.com/api/ui/).

## Running containerized app

To build and launch the app in a docker container, run `npm run docker:deploy` and navigate to `http://localhost:8888/`.

## Development server

Run `npm run start:proxy` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files. Note that [the API](https://order-pizza-api.herokuapp.com/api/ui/) that this application uses does not provide CORS headers, so we need to use an Angular proxy configuration to ensure that requests aren't blocked by the browser.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
