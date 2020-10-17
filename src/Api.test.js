import React from 'react';
import gql from 'graphql-tag';
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import awsconfig from './aws-exports';

const client = new AWSAppSyncClient({
  url: awsconfig.aws_appsync_graphqlEndpoint,
  region: awsconfig.aws_appsync_region,
  auth: {
    type: AUTH_TYPE.API_KEY, // or type: awsconfig.aws_appsync_authenticationType,
    apiKey: awsconfig.aws_appsync_apiKey,
  }
});


import { listTodos } from './graphql/queries';
describe('AWSAppSyncClient methods', function() {
  //ALC see An Async Example · Jest https://jestjs.io/docs/en/tutorial-async
  it('listTodos using return promis method', function () {
    let ret=null;
    expect.assertions(2);
    return client.query({ //ALC must return promis from it() to handle async calls correctly in tests
      query: gql(listTodos)
    }).then(({ data: { listTodos } }) => {
      //console.log(listTodos.items);
      ret = listTodos.items;
      console.log('ALC return from the test:\n'+ JSON.stringify(ret, null, 2));
      expect(ret).not.toBeNull()
      expect(ret.length).toBeGreaterThanOrEqual(1)
    });
  });

  it('listTodos using async/await method', async ()=>{
    let ret=null;
    expect.assertions(2);
    await client.query({
      query: gql(listTodos)
    }).then(({ data: { listTodos } }) => {
      //console.log(listTodos.items);
      ret = listTodos.items;
      //console.log('ALC return from the test:\n'+ JSON.stringify(ret, null, 2));
      expect(ret).not.toBeNull()
      expect(ret.length).toBeGreaterThanOrEqual(1)
    });
  });
});
import { makeExecutableSchema } from '@graphql-tools/schema';
import { addMocksToSchema } from '@graphql-tools/mock';
import {graphql, GraphQLScalarType, GraphQLString} from 'graphql';

describe('AWSAppSyncClient methods mocked', ()=> {
  //ALC Mocking | GraphQL Tools https://www.graphql-tools.com/docs/mocking/
// The assertion for a promise must be returned.
  it('listTodos using return promis method and SDL schema string', () => {
    let ret=null;
    expect.assertions(2);
// Fill this in with the schema string
    const schemaString =`
    scalar AWSDateTime
    
type Todo {
  id: ID!
  name: String!
  description: String
  createdAt: AWSDateTime!
  updatedAt: AWSDateTime!
}

enum ModelSortDirection {
  ASC
  DESC
}

type ModelTodoConnection {
  items: [Todo]
  nextToken: String
}

input ModelStringInput {
  ne: String
  eq: String
  le: String
  lt: String
  ge: String
  gt: String
  contains: String
  notContains: String
  between: [String]
  beginsWith: String
  attributeExists: Boolean
  attributeType: ModelAttributeTypes
  size: ModelSizeInput
}

input ModelIDInput {
  ne: ID
  eq: ID
  le: ID
  lt: ID
  ge: ID
  gt: ID
  contains: ID
  notContains: ID
  between: [ID]
  beginsWith: ID
  attributeExists: Boolean
  attributeType: ModelAttributeTypes
  size: ModelSizeInput
}

input ModelIntInput {
  ne: Int
  eq: Int
  le: Int
  lt: Int
  ge: Int
  gt: Int
  between: [Int]
  attributeExists: Boolean
  attributeType: ModelAttributeTypes
}

input ModelFloatInput {
  ne: Float
  eq: Float
  le: Float
  lt: Float
  ge: Float
  gt: Float
  between: [Float]
  attributeExists: Boolean
  attributeType: ModelAttributeTypes
}

input ModelBooleanInput {
  ne: Boolean
  eq: Boolean
  attributeExists: Boolean
  attributeType: ModelAttributeTypes
}

input ModelSizeInput {
  ne: Int
  eq: Int
  le: Int
  lt: Int
  ge: Int
  gt: Int
  between: [Int]
}

input ModelTodoFilterInput {
  id: ModelIDInput
  name: ModelStringInput
  description: ModelStringInput
  and: [ModelTodoFilterInput]
  or: [ModelTodoFilterInput]
  not: ModelTodoFilterInput
}

enum ModelAttributeTypes {
  binary
  binarySet
  bool
  list
  map
  number
  numberSet
  string
  stringSet
  _null
}

type Query {
  getTodo(id: ID!): Todo
  listTodos(filter: ModelTodoFilterInput, limit: Int, nextToken: String): ModelTodoConnection
}

input CreateTodoInput {
  id: ID
  name: String!
  description: String
}

input UpdateTodoInput {
  id: ID!
  name: String
  description: String
}

input DeleteTodoInput {
  id: ID
}

type Mutation {
  createTodo(input: CreateTodoInput!, condition: ModelTodoConditionInput): Todo
  updateTodo(input: UpdateTodoInput!, condition: ModelTodoConditionInput): Todo
  deleteTodo(input: DeleteTodoInput!, condition: ModelTodoConditionInput): Todo
}

input ModelTodoConditionInput {
  name: ModelStringInput
  description: ModelStringInput
  and: [ModelTodoConditionInput]
  or: [ModelTodoConditionInput]
  not: ModelTodoConditionInput
}
`
    ; //`...`

    //ALC makeExecutableSchema of graphql-tools failes with AWSDateTime in the schema - 糯米PHP https://www.nuomiphp.com/eplan/en/93426.html
    const resolvers = {
          AWSDateTime: new GraphQLScalarType({
      name: 'AWSDateTime',
      parseValue: GraphQLString.parseValue,
      parseLiteral: GraphQLString.parseLiteral,
      serialize: GraphQLString.serialize,
    }),
  }

// Make a GraphQL schema with no resolvers
    const schema = makeExecutableSchema({ typeDefs: schemaString, resolvers:resolvers });

// Create a new schema with mocks
    const schemaWithMocks = addMocksToSchema({ schema });

    const query = `
query MyQuery {
  listTodos {
    items {
      id
      name
    }
  }
}
`;

    //ALC must return promis from it() to handle async calls correctly in tests
    return graphql(schemaWithMocks, query).then(({ data: { listTodos } }) => {

      console.log('Got result', listTodos)
      ret = listTodos.items;
      expect(ret).not.toBeNull()
      expect(ret.length).toBeGreaterThanOrEqual(1)
    });
  });
  const fsp = require("fs/promises");
  it('listTodos using return promis method and reading schema string from file', () => {
    let ret=null;
    //expect.assertions(2);
    return fsp.readFile('amplify/backend/api/todo/build/schema.graphql', 'utf8').then(data => {
      // => [Error: EISDIR: illegal operation on a directory, read <directory>]

      let linesExceptLast5 = data.split('\n');//.join('\n')
      let len = linesExceptLast5.length
      // Fill this in with the schema string
      linesExceptLast5.splice(len-6,6);
      const ALCschemaString = 'scalar AWSDateTime\n' + linesExceptLast5.join('\n')
      //console.log('Got result', ALCschemaString)

      //ALC makeExecutableSchema of graphql-tools failes with AWSDateTime in the schema - 糯米PHP https://www.nuomiphp.com/eplan/en/93426.html
      const resolvers = {
        AWSDateTime: new GraphQLScalarType({
          name: 'AWSDateTime',
          parseValue: GraphQLString.parseValue,
          parseLiteral: GraphQLString.parseLiteral,
          serialize: GraphQLString.serialize,
        }),
      }

  // Make a GraphQL schema with no resolvers
      const schema = makeExecutableSchema({ typeDefs: ALCschemaString, resolvers:resolvers });

  // Create a new schema with mocks
      const schemaWithMocks = addMocksToSchema({ schema });

      const query = `
  query MyQuery {
    listTodos {
      items {
        id
        name
      }
    }
  }
  `;

      //ALC must return promis from it() to handle async calls correctly in tests
      return graphql(schemaWithMocks, query).then(({ data: { listTodos } }) => {

        console.log('Got result', listTodos)
        ret = listTodos.items;
        expect(ret).not.toBeNull()
        expect(ret.length).toBeGreaterThanOrEqual(1)
      });
    });
  });
});
