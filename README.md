# Explorer - Rocketseat

## Food Explorer Backend API

Food Explorer is the final challenge application of the Explorer course from [Rocketseat School](https://www.rocketseat.com.br/).

This API works together with the frontend app that can be seen here: [Food Explorer Frontend](https://github.com/cah90/foodexplorer-frontend).

The aim of this project was to create an API application for a restaurant that allows the administrator of the app to create, edit and delete dishes and the regular users of the app to be able to login, create an account, see the restaurant dishes, see each dish in detail with pictures, description and ingredients and then place orders.

You can check the final result of the app by clicking here - [Food Explorer APP](https://rocketseat-foodexplorer.netlify.app/).

## Technologies

The main technologies used:

- NodeJS
- JavaScript
- SQLite
- Express.js

## Installation

You can either download the project through GitHub or you can clone it using your terminal.

```
git clone https://github.com/cah90/foodexplorer-backend.git
```

After that we can access the folder containing the app

```
cd foodexplorer-backend
```

Install all the dependencies that the project will need

```
npm install
```

Run the migrates for building the database tables

```
npm run migrate
```

Iniciate the project

```
npm run dev
```

## Usage

After having your API running, it is possible to interact with the database
through these endpoints:

```
# Create a new session
POST /sessions

# Create a new user
POST /users

# Retrieve list of all dishes
GET /dishes

# Add a new dishes
POST /dishes

# Retrieve one dish by its ID
GET /dishes/:id

# Update a dish by its ID
PUT /dishes/:dishId

# Delete a dish by its ID
DELETE /dishes/:dishId



```

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Author

Made by Cássia Bernardo.
