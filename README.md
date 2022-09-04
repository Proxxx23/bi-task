# bi-task
This is a small API made for a technical recruitment process for Bright Inventions. 
It allows for listing, adding and removing books read by an user.

## Prerequisites
Copy `.env.example` file into `.env` file.

## First time run
- `npm install && npm run migrate` 

## To run app
- `npm run dev` (will run in a nodemon mode)

Application will run on [https://localhost:3000](localhost:3000)

## Tests
Tests use `testServer.ts`. NODE_ENV env variable is set to a value different than `"production"` there. It means tests will operate on a test tables.

To run tests: `npm run test`. First, you must migrate dabatases!

## Troubleshooting
There may be a problem with running migrations. Please ensure two databases in `./db` directory were created after `npm run migrate` command was run.

## Endpoints

| Endpoints                                                                           |
|-------------------------------------------------------------------------------------|
| [GET] `/books?perPage={n}&offset={n}` - to list all the books entered into a system |
| [POST] `/books` - to add book into a system                                         |
| [PATCH] `/books/:id` - to update book in a system                                   |
| [DELETE] `/books/:id` - to remove book from a system                                |
| [POST] `/books/:id/comments` - to add comment to a book                             |

