# express-boilerplate

> Node.js - Express - Redis - Jest - ESLint - Nodemon Boilerplate

## Getting Started

**Click the "Use this template" button.**

Alternatively, clone the project to use it without creating a repository on your account.

```
git clone https://github.com/eralpsahin/express-boilerplate.git [my-project]
cd [my-project]
rm -rf .git README.md
```

Change the app name for `debug` configuration in the `bin/wwww` file

```
const debug = require('debug')('myapp');
```

Change the environment variable used in `package.json` `dev` script to the name you used previously

```
{
    ...
    "dev": "DEBUG=myapp nodemon --inspect ./bin/www",
    ...
}
```

Change package name in `package.json`

```
{
    ...
    "name": "myapp",
    ...
}
```

Install npm packages

```
npm i
```

## Debugging

Run `npm run dev` to run the app with `nodemon`.

File `.vscode/launch.json` has the necessary configuration to use VS Code debugging with `nodemon`. Run `npm run dev` and follow [this](https://github.com/microsoft/vscode-recipes/tree/master/nodemon#debugging-the-node-process) last step to use the built-in Node Debugger.

## Testing

There are boilerplace tests using `Jest` and `Supertest` that test `/` and `/users/` routes in `test` folder.
