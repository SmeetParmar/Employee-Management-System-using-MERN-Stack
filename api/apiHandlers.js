const fs = require('fs');
const { ApolloServer } = require('apollo-server-express');
const employee = require('./employee');
const GraphQLDate = require('./graphQlDate');

//redolvers for graphql api...
const resolvers = {
    Query: {
        employeeList: employee.employeeList,
        
        oneEmployee: employee.getOneEmployee,

        upComingRetirement: employee.getUpComingRetirement,
    },
    Mutation: {
        addEmployee: employee.addEmployee,

        deleteEmployee: employee.deleteOne,

        terminateEmployee: employee.terminate,

        updateEmployee: employee.updateEmployee,
    },
    GraphQLDate,
};

const server = new ApolloServer({
    typeDefs : fs.readFileSync('./schema.graphql', 'utf-8'),
    resolvers,
    formatError: error => {
        console.error(error);
        return error;
    },
});

function getHandler(app)
{
    server.applyMiddleware({ app, path: '/graphql' });
}

module.exports = { getHandler };