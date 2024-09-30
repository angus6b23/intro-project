# Example starter project

## Running

This is a complete Node application. It can be run from the command line or within a Docker container:

```
node ./index.js
```

Then point a browser to `http://localhost:3000`

The application now requires several dependencies to be installed before running.

After pulling the repo, run the following to install the dependencies:

```
npm install
```

Also npm scripts are added for easier development and testing.
To spawn a development instance with hot-loading, run:

```
npm run dev
```

To start a production server, run:

```
npm run start
```

To run tests, run:

```
npm run test
```

To fix eslint errors, run:

```
npm run eslint-fix
```

## Tasks Tracker

Some tasks - choose as many or as few as you would like to complete.

- [x] Add some tests - a test suite such as Mocha will require adding. The Node backend functions require testing as well as front end functions.
  - Implements some test for both front-end and back-end
  - For front-end: Test will be run with selenium to ensure ui is working as intended
  - For back-end: Test are integrated with db reading and writing
- [x] The person table needs to be completed - at the very least complete the edit function.
  - Person edit function is now functional
  - Person delete is also possible now
- [x] Convert the backend to use a non-volatile data store - a simple option would be to build in support for SQLite to save data to a database.
  - A Sqlite database is currently used for storing persons
- [x] We need to add further elements - Landlords and Buildings. Buildings require Rooms.
  - In sqlite db, a new table buildings is created
  - The table stores name of building, landlord (linked to person table) and number of rooms
  - Backend integration can be further developed
- [x] Consider the UI - can it be improved - what would you suggest?
  - Minor UI updates

## Gotchas

1. Style matters.
2. ESlint and Javascript checking are enabled in this project for VScode - keep an eye on this (you can check for linting errors by running `npx eslint index.js` ).
3. Show us your git etiquette.

## Comments for further improvement

- Backend
  - The application is currently storing data in a sqlite db, for production, consider using a db like postgres or mysql
  - Backend apis require input validation and sanitization before production
- Frontend
  - Responsive design can be used to ensure consistency across different devices
  - Using UI library such as MUI / bootstrap can make the site looks better meanwhile reducing css coding
