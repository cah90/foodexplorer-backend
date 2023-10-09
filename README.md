# Explorer - Rocketseat

## Food Explorer Backend API - 🍔

Food Explorer is the final challenge application of the Explorer course from [Rocketseat School](https://www.rocketseat.com.br/).

This API works together with the frontend app that can be seen here: [Food Explorer Frontend](https://github.com/cah90/foodexplorer-frontend).

The aim of this project was to create an API application for a restaurant that allows the administrator of the app to create, edit and delete dishes and the regular users of the app to be able to login, create an account, see the restaurant dishes, see each dish in detail with pictures, description and ingredients and then place orders.

You can check the final result of the app by clicking here - [Food Explorer APP](https://rocketseat-foodexplorer.netlify.app/).

## Diagrama do Banco de Dados

<h1 align="center">
  <img src="./assets/database-diagram.png">
</h1>

## Technologies

The main technologies used:

- NodeJS
- JavaScript
- SQLite
- Express.js

## Tools used for local development

- Insomnia - It can be download [here](https://insomnia.rest/download)

- Beekeper - It can be dowload [here](https://www.beekeeperstudio.io/get)

- It is also important to have NodeJS installed in your computer, you can download it [here](https://nodejs.dev/pt/)

## Installation

There are two ways of installing this project in your computer.

1. You can download the project through GitHub by clicking in the button "Code" then "Download ZIP".

2. Or you can clone it using your terminal.

### Steps when using the terminal

Open your terminal and type the following command:

```
git clone https://github.com/cah90/foodexplorer-backend.git
```

Having the first step done, you can access the folder that contains the app.

```
cd foodexplorer-backend
```

Now, install all the dependencies that the project will need.

```
npm install
```

And run the migrates for building the database tables.

```
npm run migrate
```

You can now iniciate the project.

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
