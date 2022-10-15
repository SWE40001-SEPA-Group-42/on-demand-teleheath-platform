
## Requirements to run database
1. .env file containing the following variables:
    * NODE_ENV (e.g. develop, uat production)
    * PORT 
    * MONGO_URI 
2. Node, Nodemon & NPM
3. Jest - For Unit Testing

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the node backend server to the mapped port, any errors will be visible within the terminal.\
The server will reside in port 8001 by default [http://localhost:8001]

### `npm run server`

Launches the server in Nodemon - allowing for any dynamic changes to update instantly while the server is in runtime. \

The application will also be running in [http://localhost:8001]

### `npm test`

Launches the Jest Testing Suite in the interactive watch mode.\
See the section about [running tests]

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

