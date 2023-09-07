const express = require('express');
const createError = require("http-errors");
const config = require('./src/config/defaults');
const connectDb = require('./src/config/database');
const graphqlHttp = require('express-graphql').graphqlHTTP;

const graphqlSchema = require('./src/graphQL/schema');
const graphqlResolver = require('./src/graphQL/resolvers');
const auth = require('./src/middleware/auth')


//firing the database 
connectDb();
// firing express
const app = express();

app.use(express.json());

// Setting up graphql
app.use(
    '/graphql', 
    graphqlHttp({
      schema: graphqlSchema,
      rootValue: graphqlResolver,
      graphiql: true,
      customFormatErrorFn(err){
        if(!err.originalError){
          return err;
        }
        const data = err.originalError.data;
        const message = err.message || 'An error occured.';
        const code = err.originalError.code || 500;
        return {message: message, status:code, data: data};
      }
    })
  );

// catch application errors
app.use(async (error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

app.listen(config.port, ()=>{
    console.log(`Server started on port ${config.port}`)
})
