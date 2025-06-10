# Home Library Service

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```
or if you have some errors while installing NPM modules (due to deprecated versions of dependencies)
```
npm i --force
```
## Creating .ENV file

Create .env file based on .env.example file.

## Creating .ENV file

Create .env file based on .env.example file.

## Docker

1. If you a Windows user, start Docker desktop.
2. To build an app and database in Docker, run the following script:

```
npm run docker:up
```

3. After that, run the script to start migration

```
npm run prisma:migrate
```

To scan the container for vulnerabilities

```
npm run docker:scan
```

## Running application

```
npm run start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
