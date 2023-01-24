# wmcp-pokedex

## Developer Notes

### Starting the project

To start the project, download this repo, and in the root folder:

```
yarn install
yarn start
```

### Caveats

- I have never used a PokeDex (or knew they existed), so I familiarized myself with them through YouTube videos and Google searches.

- I found and used the base HTML and CSS from [this article](https://dev.to/oryam/css-pokedex-3iln) for the basic PokeDex layout. The height has been adjusted, and "broke" the line on the right side.

- The technical requirements call for `Redux` and `TypeScript`, so I have added a simple `Provider` and `Slice` per the [official Redux documentation](https://redux.js.org/tutorials/typescript-quick-start).

- The calls to the API are currently in `useEffect` hooks in the Components. I would prefer to move the api functionality to an `apiService` (which is included in the codebase but not complete) and call the service methods, but in the interest of time, left them inline.

  - The Pokemon are not "lazy loaded" (loading all "next" urls after the first set are displayed), but should be since the "Search" functionality can only search through retrieved results. There are several strategies for this, but in the interest of time, has not been implemented.

- The current sprites being displayed are from `sprites.versions['generation-i']['red-blue']` section returned from the api. I have seen an example where they animate alternating versions (along with the large light at the top on/off), but am unsure which to alternate between

Business requirements are:

+ To use the PokeAPI. Per the recommendations on the pokeapi.co site, and the project requirements are to use `TypeScript`, I have chosen to use the recommended `pokenode-ts` library which handles things like `CORS` and `CORBS` `localhost` fetching errors that the React pre-packaged fetch does not.

+ To be able to search for any Pokemon:

  + Click the white button labeled "Search".
  + Use the thin black buttons below the blue buttons to scroll through the letters and digits
  + Use the blue buttons to enter the character(s), then click 'Search' again. The 'Search' screen should now be 'Search Results'
  + Click the white button labeled "Clear" to clear the search string and return to the default attributes screen.
    + This functionality is rudimentary and incomplete. There is no way to backspace without clearing the search entirely.
    + I would ask for clarification from the Project Manager at that point to see if there were better examples or implementations we could use.

+ To be able to view a history of viewed Pokemon (and revisit at anytime):
  + a rudimentary "View History" block resides next to the PokeDex. Given more time, I would implement the "revisit at anytime" functionality.
  + uses `localStorage` to save history, but is not retrieved on reload.

## END Developer Notes

## Instructions

These are the instructions provided in the PDF sent to me by PrizePicks

### Overview

This project should take approximately 2+ hours to complete and help PrizePicks
assess your front end knowledge and development style.

```
If you find the project takes longer than you’d like please submit a functional
version of what you have. We're interested in assessing a functioning project
even if all of the business requirements are not implemented.
```

### The Problem

Ash and his friends are on a new adventure to catch even more Pokemon! Before they
set off on this journey they need some tools. As we all know every great Pokemon
trainer needs a reliable Pokedex to identify Pokemon. It’s a good thing they have you!
Ash has asked if you would be willing to build him a brand new Pokedex with core
features and a couple of enhancements.

### Business Requirements

Please attempt to implement the following business requirements:

- ✅ Use the Pokemon API to make API requests for data [https://pokeapi.co/docs/v2](https://pokeapi.co/docs/v2).
- ✔️ Able to search for any Pokemon.
- ✔️ Able to see a history of what has been searched and revisit at anytime.

### Technical Requirements

The following technical requirements must be met:

- ✅ You are allowed to use scaffolding technology like “Create React App” or similar.
- ✅ This project should be done with the latest React framework.
- ✅ This project should be done with the latest Redux framework.
- ✅ This project should be done using TypeScript.
- ✅ This project should be done using version control, preferably git.
- ✅ This project can be styled with SCSS/CSS or Styled Components if anything needs
to be styled.
- ✅ This project should include a README that addresses anything you may not have
completed. It should also address what additional changes you might need to make
if the application were intended to run in a concurrent environment. Any other
comments or thoughts about the project are also welcome.

### Bonus Points

- Able to see details about abilities, moves, species, sprites and types upon
searching.
- Able to see other evolutions of Pokemon and be able to navigate to specific
Pokemon in the evolution chain.
- ✅ A sleek and intuitive layout that resembles a Pokedex.
- Automated tests that ensure the business logic implemented is correct.

### Submission Requirements

✅ A link to a hosted git repository or tarball of the git repository of the finished project.

## END Instructions

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
