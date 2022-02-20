# Reusable type definition

For many apps, you can define a fixed schema when the application starts, and define it using GraphQL schema language. In some cases, it's useful to construct a schema programmatically. You can do this using the GraphQLSchema constructor.

When you are using the GraphQLSchema constructor to create a schema, instead of defining Query and Mutation types solely using schema language, you create them as separate object types.

---

<table>
    <thead>
        <tr>
            <th>GraphQL schema language</th>
            <th>GraphQLSchema constructor</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
            <pre><code>
var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
var schema = buildSchema(`
  type User {
    id: String
    name: String
  }
  type Query {
    user(id: String): User
  }
`);
var root = {
  user: ({id}) => {
    return fakeDatabase[id];
  }
};
</code></pre>
            </td>
            <td>
            <pre><code>
var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var graphql = require('graphql'); 
// Define the User type
var userType = new graphql.GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: graphql.GraphQLString },
    name: { type: graphql.GraphQLString },
  }
});
// Define the Query type
var queryType = new graphql.GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: userType,
      args: {
        id: { type: graphql.GraphQLString }
      },
      resolve: (_, {id}) => {
        return fakeDatabase[id];
      }
    }
  }
});
var schema = new graphql.GraphQLSchema({query: queryType});
</code></pre>
            </td>
        </tr>
    </tbody>
</table>

---

<table>
    <thead>
        <tr>
            <th>GraphQL schema language</th>
            <th>GraphQLSchema constructor</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
            <pre><code>
// Maps id to User object
var fakeDatabase = {
  'a': {
    id: 'a',
    name: 'alice',
  },
  'b': {
    id: 'b',
    name: 'bob',
  },
};
var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running at localhost:4000/graphql');
</code></pre>
            </td>
            <td>
<pre><code>
// Maps id to User object
var fakeDatabase = {
  'a': {
    id: 'a',
    name: 'alice',
  },
  'b': {
    id: 'b',
    name: 'bob',
  },
};
var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));
app.listen(4000);
console.log('Running at localhost:4000/graphql');
</code></pre>
            </td>
        </tr>
    </tbody>
</table>

---

### BrandX

Define reusable javascript types from graphql.

```js
import {
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} from 'graphql';

const InvoiceStatusType = new GraphQLEnumType({
  name: 'InvoiceStatus',
  values: {
    PAID: { value: 'PAID' },
    UNPAID: { value: 'UNPAID' },
    OVERDUE: { value: 'OVERDUE' },
  },
});

const InvoiceType = new GraphQLObjectType({
  name: 'Invoice',
  fields: () => ({
    invoiceAmount: { type: GraphQLFloat },
    invoiceNumber: { type: GraphQLString },
    issueDate: { type: GraphQLDate },
    ocrNumber: { type: GraphQLString },
    status: { type: InvoiceStatusType },
  }),
});

const fetchInvoices = async (_: any, { ssn }: Record<string, any>) => {
  const response = await fetch(`${INVOICE_URL}?ssn=${ssn}`);
  return response.json();
};

const InvoiceSchema = () => ({
  Query: {
    fetchInvoices: {
      type: new GraphQLList(InvoiceType),
      resolve: fetchInvoices,
    },
  },
});
```
