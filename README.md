Welcome to the myReads application.This is the initial project of the Udacity React nanodegree.
The project allows the user to search for books and add them to one of the 3 predefined shelves :
Read,Currently Reading and Want To Read

## Project files
The app is built using the provided starter template.It includes the following files:

```
+--public/    
 |-- index.html - DO NOT MODIFY
 |-- favicon.ico - React Icon, You may change if you wish.
+-- src/
 +-- icons/ - Helpful images for your app. Use at your discretion.
  |-- add.svg
  |-- arrow-back.svg
  |-- arrow-drop-down.svg
 +-- utils
  |-- allowedSearchTerms.js - Exports an array used to define the terms allowed in the search for books
  |-- BooksAPI.js - A JavaScript API for the provided Udacity backend. 
 +-- components
  |-- Book.js - Component used for rendering a given book together with the dropdown for shelf selection
  |-- MyReads.js - Main page of the app.Renders the 3 shelves with the books belonging to them
  |-- SearchBooks.js - Renders the search page and the search results.Allows adding a book to one of the shelves
 |-- App.js - This is the root of your app. Contains static HTML right now.
 |-- App.css - Styles for your app. Feel free to customize this as you desire.
 |-- App.test.js - Used for testing. Provided with Create React App. 
 |-- index.js - You should not need to modify this file. It is used for DOM rendering only.
 |-- index.css - Global styles. You probably won't need to change anything here.
|-- .gitignore 
|-- CONTRIBUTING.MD - Information about contributing to this repo. 
TL;DR - Fork and clone your own version of this to use it.
|-- README.MD - This README file.
|-- SEARCH_TERMS.md - The whitelisted short collection of available search terms 
for you to use with your app.
|-- package.json - npm package manager file. It's unlikely that you'll need to modify this.
|-- package-lock.json - npm package manager file.COntains description of the dependencies of the modules used in the project.
```

## Installation 

Before starting the project for the first time,you must first install the needed modules by entering:

```
npm install 

```

## Starting and accessing the app 

The application can be started by entering:

```
npm start

```
The pages of the application are available at the following URLs:

```
http://localhost:3000/ - Main page 
http://localhost:3000/search - Search page 

```

## MyReads pages functional description 

### Main page 

The 3 shelves are displayed on this page ,together with the books belonging to them.With each book,a dropdown is displayed allowing the user to move the book to a different shelf,or delete it by setting the shelf to None.
<br> New books can be added to the collection by pressing the "+" button and going to the search page.

### Search page

Here,the user can search for and add new books to the shelves.
Books can be searched by using one of the following allowed terms:
 
    * Android
    * Art
    * Artificial Intelligence
    * Astronomy
    * Austen
    * Baseball
    * Basketball
    * Bhagat
    * Biography
    * Brief
    * Business
    * Camus
    * Cervantes
    * Christie
    * Classics
    * Comics
    * Cook
    * Cricket
    * Cycling
    * Desai
    * Design
    * Development
    * Digital Marketing
    * Drama
    * Drawing
    * Dumas
    * Education
    * Everything
    * Fantasy
    * Film
    * Finance
    * First
    * Fitness
    * Football
    * Future
    * Games
    * Gandhi
    * Homer
    * Horror
    * Hugo
    * Ibsen
    * Journey
    * Kafka
    * King
    * Lahiri
    * Larsson
    * Learn
    * Literary Fiction
    * Make
    * Manage
    * Marquez
    * Money
    * Mystery
    * Negotiate
    * Painting
    * Philosophy
    * Photography
    * Poetry
    * Production
    * Programming
    * React
    * Redux
    * River
    * Robotics
    * Rowling
    * Satire
    * Science Fiction
    * Shakespeare
    * Singh
    * Swimming
    * Tale
    * Thrun
    * Time
    * Tolstoy
    * Travel
    * Ultimate
    * Virtual Reality
    * Web Development
    * iOS
