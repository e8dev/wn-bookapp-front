# My Books App

This project is a web application for managing a collection of books. It allows users to add, edit, and delete books, as well as filter and search for books based on various criteria.

## Installation

To install dependencies, run the following command:

```
npm install
```


## Usage

To run the app on the default port (3000), use the following command:

```
npm install
npm start
```

Make sure to set any necessary environment variables before running the app.

## Structure

The project is structured as follows:

- `api`: Contains setup files and individual service routes.
- `components`: Contains layout components and commonly used components.
- `pages`: Contains pages of the app.
- `routes`: Contains routes of the app.
- `styles`: Contains style files.
- `types`: Contains types/interfaces.

The modular structure allows for easy expansion of functionality and separation of concerns.

## Edit / Add Book

The form to edit or add a book uses a custom `BookForm` component because both methods require the same fields. Handlers for these methods are kept in the respective edit/add pages.

The `BookForm` component facilitates reusability and maintainability by centralizing the form logic.


## TODO

To improve dev perfomance it is recommended to install vite and husky.

