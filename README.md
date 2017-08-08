# Bibby's My Reads application

This application fulfills the requirements for the Udacity React Nanodegree MyBooks Project.

## Base Features
The following are the base features that were implemented to fulfil the project specification
  - Viewing Read, Want To Read, and Currently Reading bookshelves
  - Moving books from one bookshelf to another, or to no bookshelf
  - Searching for books using any of the approved search terms (available in [SearchTerms.js](./src/SearchTerms.js))
  - Adding a book to a shelf from the search results page
  - Autosearch on each key-press to show results as the user types in their search term

## Additional Features
The following are additional features that I added over and above the project requirements:
  - Autocomplete/Autosuggest for the search query which is limited to the terms listed in [SearchTerms.js](./src/SearchTerms.js)
  - Toast notifications when an error occurs or when a book is successfully added to a shelf or removed from all shelves


## Running The Application

This application was tested with the following software versions

| Application | Version | Notes |
|-------------|:-------:|-------|
| [Node JS](https://nodejs.org/) | 6.11.2 ||
| [NPM](https://www.npmjs.com/) | 3.10.10 ||
| [Yarn](https://yarnpkg.com) | 0.27.5 | optional |

### Installing dependencies
To install dependencies you can use either Yarn or NPM as follows:

#### With Yarn
```bashp
yarn install
```

#### With NPM
```bashp
npm install
```

### Running the Application
The application can be run using either Yarn or NPM run commands as follows:

#### With Yarn
```bashp
npm start
```

#### With NPM
```bashp
yarn start
```

## create-react-app

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## License

This project is [MIT Licensed](./LICENSE)
