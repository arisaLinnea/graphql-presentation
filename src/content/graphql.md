## GraphQL

- One specification to get and set resources over HTTP
- One endpoint to rule them all /graphql

---

## Query

- A query language for your API
- You always get back what you expect, and the server knows exactly what fields the client is asking for

---

## Types of Queries

- query ( GET )
- mutation ( POST, PUT, PATCH, DELETE )

(Every query execution resolves to a POST request)

---

```json [1-7]
    {
      books:[{
        id: "1",
        name: "The Two Towers",
        authorId: 2
      }]
    }
```

```gql [1-5|7-15]
    query {
      books {
        name
      }
    }
    
    {
      "data": {
        "books": [
          {
            "name": "The Two Towers"
          }
        ]
      }
    }
```

---

## Arguments

- Query params ( /hero?id=1000 )

```gql [1-5|7-13]
query {
  book(id: 1) {
    id,
    name
  }
}

{
  "data": {
    "book": {
      "id": 1,
      "name": "The Two Towers"
    }
  }
}
```

---

## Mutations

```gql [1-6|8-14]
mutation {
    addAuthor(name: "new author"){
      id,
      name
    }
}

{
  "data": {
    "addAuthor": {
      "name": "new author",
      "id": 9
    }
  }
}
```

---

## Schema

Define query and mutation types in schema.

```
schema {
  query: Query
  mutation: Mutation
}
```

---

### Schema: Type

Describe what types and schema exist.

The `GraphQL Schema Language` way:

```typescript [1-4|6-10|12-16|18-25]
interface Character {
  name: String!
  appearsIn: [Episode!]!
}

enum Episode {
  NEWHOPE
  EMPIRE
  JEDI
}

type Starship {
  id: ID!
  name: String!
  length(unit: LengthUnit = METER): Float
}

type Human implements Character {
  id: ID!
  name: String!
  friends: [Character]
  appearsIn: [Episode]!
  starships: [Starship]
  totalCredits: Int
}
```

---

## Type: Query

```ts
type Query {
  rollDice(numDice: Int!, numSides: Int): [Int]
}
```

---

### Type: Mutation

```gql [1-4|6-9|11-13]
enum Status {
  SUCCESS
  FAILURE
}

input OrderInput {
  orderId: String!
  productId: String!
}

type Mutation {
  placeOrder(order: OrderInput!): Status
}
```

---

## Resolver

```gql [1-3]
type Query {
  rollDice(numDice: Int!, numSides: Int): [Int]
}
```
```js [1-9]
const root = {
  rollDice: ({ numDice, numSides }) => {
    const output = [];
    for (let i = 0; i < numDice; i++) {
      output.push(1 + Math.floor(Math.random() * (numSides || 6)));
    }
    return output;
  }
};
```

---

## GraphQL Server

Connect it all in backend: `types, schemas and resolvers`

```js [6-10|12-20|22-28]
import express from 'express';
import graphqlHTTP from 'express-graphql';
import { buildSchema } from 'graphql';
import schema from './schema';

const schema = buildSchema(`
  type Query {
    rollDice(numDice: Int!, numSides: Int): [Int]
  }
`);

const root = {
  rollDice: ({numDice, numSides}) => {
    const output = [];
    for (let i = 0; i < numDice; i++) {
      output.push(1 + Math.floor(Math.random() * (numSides || 6)));
    }
    return output;
  }
};

const app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
```

---

### Reusable type definition

Define reusable javascript types from graphql.

```js [3-10|12-21|23-26|28-35]
import { GraphQLEnumType, GraphQLFloat, GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql';

const InvoiceStatusType = new GraphQLEnumType({
  name: 'InvoiceStatus',
  values: {
    PAID: { value: 'PAID' },
    UNPAID: { value: 'UNPAID' },
    OVERDUE: { value: 'OVERDUE' },
  }
});

const InvoiceType = new GraphQLObjectType({
  name: 'Invoice',
  fields: () => ({
    invoiceAmount: { type: GraphQLFloat },
    invoiceNumber: { type: GraphQLString },
    issueDate: { type: GraphQLDate },
    ocrNumber: { type: GraphQLString },
    status: { type: InvoiceStatusType }
  })
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