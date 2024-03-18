# My Books App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Description

In the project main work is done about the project structure and ability to expand functionality using modular skeleton.

In the src folder:

api - this folder contains: api.ts - setup file  (basic url, +ability to intergate authorization here and setup axios lib parameters) , and also individual services routes such as books.ts

components - this folder contains layout components ("layout" folder) and commonly used components ("misc") such as pagination, alerts, etc.

pages - this folder contains pages of the app

routes - this folder contains routes of the app

styles - this folder contains styles files

types - this folder contains types/interfaces



## Edit / Add Book

Form to edit or add book is using custom BookForm component because both methods require the same fields.
Handlers for these 2 methods are different so we keep them in the edit/add pages accordingly.
