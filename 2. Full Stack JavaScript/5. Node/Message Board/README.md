# Message Board

## About The Project

[The Oding Project](https://www.theodinproject.com): Mini Message Board.
Exercise as part of the Full-stack JavaScript curriculum on Node.

## Project Overview

Express server that serves rendered views and allows different users to post messages.
It is built with NodeJS and TypeScript, using EJS as the templating engine.
The goal of this exercise is to apply routing, middlewares and passing data to template views.

The project offers the below functionalities:

- [ExpressJS](https://expressjs.com) server.
- Routes for `/` (message list), `authors` (author list), and `/new` (new message form).
- In-memory `messages` array seeded with sample messages.
- EJS views.
- Catch-all 404 handler.
- Deployment via Docker container.

## Instructions

The full set of instructions can be found at [The Odin Project](https://www.theodinproject.com/lessons/node-path-nodejs-mini-message-board).

- Create an Express app and set up a `views` directory with EJS as the view engine.
- Create the `/` and `/new` routes.
- Create sample messages data.
- Create the template views.
- Create the form.
- Process data from the form and add it to the message list.

## Deployment

This project deviates from the instructions. Rather than deploying to a PaaS, this project includes a Docker file and will be deployed to a VPS.

1. Build the Docker image for the target platform

```sh
docker build --platform linux/amd64 -t message-board:amd
```

2. Run the image with the environment variables

```sh
docker run -d --name=message-board -p 3000:3000 --env-file=.env message-board:amd
```
