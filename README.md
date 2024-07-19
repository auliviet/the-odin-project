# Toodoo

[The Oding Project](https://www.theodinproject.com): Todo List.
Exercise as part of the Full-stack JavaScript curriculum on JSON and OOP principles.

## Preview link

[Github Pages](https://auliviet.github.io/the-odin-project/todo-list/)

## Project Overview

Toodoo is a simple todo list that organise tasks based on their due date and priority.

This project offers the below functionalities:

- The project uses localStorage. The data is kept after the user refreshes its window or closes its browsers. The data is refreshed when clearing the localStorage within the browser.
- Toodoo lets user creates new tasks and set their title, description, due date and priority.
- Toodoo organises the tasks based on their due date:
  -- Overdue (before today, 00:00)
  -- Today (before today, 23:59)
  -- This Week (before next Sunday, 23:59)
  -- This Month (before the last day of the month, 23:59)
  -- Later (anything after that).
- Within each column, the tasks are then ordered by priority:
  -- High
  -- Medium
  -- Low
  -- No priority
- Tasks that have been completed are hidden from the board. The user can chose to display them again.
- Use [Webpack](https://webpack.js.org) to bundle the source files.

## Instructions

The full set of instructions can be found at [The Odin Project ](https://www.theodinproject.com/lessons/node-path-javascript-todo-list).

- Your ‘todos’ are going to be objects that you’ll want to dynamically create.
- Brainstorm what kind of properties your todo-items are going to have.
- Your todo list should have projects or separate lists of todos.
  -- When a user first opens the app, there should be some sort of ‘default’ project to which all of their todos are put.
- You should separate your application logic from the DOM-related stuff.
- The look of the User Interface is up to you, but it should be able to do the following:
  -- View all projects.
  -- View all todos in each project (probably just the title and duedate… perhaps changing color for different priorities).
  -- Expand a single todo to see/edit its details.
  -- Delete a todo.
- You should add some persistence to this todo app using the Web Storage API.

## Future enhancements

- Resolve accessibility issues on Safari (forms drop down).
- Let user create projects and assign projects to tasks.
- Add animations:
  -- Fade out when a task is completed
  -- Slide on the toggle button
