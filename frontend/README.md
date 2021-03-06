This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Project Goal

This is a solution to coding challenge to create a react app that does basic CRUD operations. This is a front-end only solution.

# Architectural Considerations & Possible Improvements

This project has quite simple business logic, so I chose to write business logic inside components that're relevant to the business logic (A.K.A App and ExchangeRateChart).

A better way to do this is implement Flux or Redux pattern, it has the advantage of serparating business logic with view rendering and user interacation logic. It is also easier to prevent unintended side-effects and easier to debug. However, to keep this project brief and simple I chose not to implement Flux/Redux.

# Things left out

- Press 'Enter' to update contract when editing contract
- Error messages


# Files generated by create-react-app

- App.js
- App.css
- App.test.js
- index.css
- inde.js
- serviceWorker.js
- .gitignore
- package.json

# Install json_server

This demo uses json_server as a test backend, to install json_server, run
```
yarn global add json_server
```

or 

```
npm install -g json_server
```

# Generate test data & Run server

```
cd json_server
node gen.js > test.json
json-server --port 8000 test.json
```

# Run the demo

```
yarn start
```

or

```
npm start
```
