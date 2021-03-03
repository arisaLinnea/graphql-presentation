# Schema, resolver and queries

 <ul>
    <li>GraphQl language</li>
    <li>Basic Types</li>
    <li>Schema</li>
    <li>Resolver</li>
    <li>Queries</li>
    <ul>
      <li>Query</li>
      <li>Alias, operation type, operation names and variables</li>
      <li>Default variables</li>
      <li>Directives</li>
      <li>Fragments</>
      <li>Mutation</li>
      <li>Subscription</li>
    </ul>
  </ul>

---

## GraphQl language

GraphQL doesn't belong or depend on any other specific programming language or database. So to define the parts of our graphQL implementation we use graphQL Schema language.

---

Example:

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

## Basic Types

The GraphQL schema language supports the scalar types of String, Int, Float, Boolean, and ID.

By default, every type is nullable - it's legitimate to return null as any of the scalar types. Use an exclamation point to indicate a type cannot be nullable, so String! is a non-nullable string.

To use a list type, surround the type in square brackets, so [Int] is a list of integers.

Besides these you have enum and the types defined by you.

---

## Schema

A GraphQL schema is made up of object types, which define which kind of object you can request and what fields it has.

```
schema {
  query: Query
  mutation: Mutation
}
```

---

```gql[1-11|13-22]
type Query {
  allPersons(last: Int): [Person!]!
}

type Mutation {
  createPerson(name: String!, age: Int!): Person!
}

type Subscription {
  newPerson: Person!
}

type Person {
  name: String!
  age: Int!
  posts: [Post!]!
}

type Post {
  title: String!
  author: Person!
}
```

---

```gql
var schema = buildSchema(`
  type Query {
  allPersons(last: Int): [Person!]!
}

type Mutation {
  createPerson(name: String!, age: Int!): Person!
}

type Subscription {
  newPerson: Person!
}

type Person {
  name: String!
  age: Int!
  posts: [Post!]!
}

type Post {
  title: String!
  author: Person!
}
`);
```

---

## Resolver

The API developer attaches each field in a schema to a function called a resolver. During execution, the resolver is called to produce the value.

```gql
var root = {
  hello: () => {
    return 'Hello world!';
  },
};
```

---

## GraphQL Playground

GraphQL Playground is a GraphQL IDE. Previous defined as GraphiQL


Disable it in production
```gql
app.use('/graphql', graphqlHTTP({
  schema: MySessionAwareGraphQLSchema,
  graphiql: process.env.NODE_ENV === 'development',
}));
```


---


## Queries (and mutation)

If we were to think about them in terms of the create, read, update and delete (CRUD) model, a query would be equivalent to read. All the others (create, update, and delete) are handled by mutations

---

### Alias, operation type, operation names and variables

```gql
{
  users {
    id
  }
}
```

```gql
query {
  users {
    id
  }
}
```

```gql
query{
  myUsers: users {
    id
  }
}
```

```gql
query getUsers{
  myUsers: users {
    id
  }
}
```

https://7sgx4.sse.codesandbox.io/

---

### Operation types

query, mutation, subscription

The operation type is required unless you're using the query shorthand syntax. If using the shorthand syntax you can't use a operation name.

---

### Operation names

It is only required in multi-operation documents, but its use is encouraged because it is very helpful for debugging and server-side logging. When something goes wrong (you see errors either in your network logs, or in the logs of your GraphQL server) it is easier to identify a query in your codebase by name instead of trying to decipher the contents.

---

### Queries with variables

There is two ways to use variables. Sometimes you might 'hardcode' it in your query and sometimes (or most common) you need the varible to be dynamic.

```jgql
query getUser{
   user(name: "ivey"){
    id
    login
  }
}
```

```gql
query getUser($name: String){
   user(name: $name){
    id
    login
  }
}
```

https://7sgx4.sse.codesandbox.io/

---

Arguments not only on root level

```gql
{
  human(id: "1000") {
    name
    height(unit: FOOT)
  }
}
```

---

### Default variables

```gql
query getUser($name: String = "ivey"){
   user(name: $name){
    id
    login
  }
}
```

```gql
{
  "name": "mojombo"
}
```

---

### Directives

```gql
query getUser($name: String!, $showlogin: Boolean!){
user(name: $name){
id
login @include(if: $showlogin)
}
}
```
```gql
{
"name": "mojombo",
"showlogin": false
}
```

@include(if: Boolean) Only include this field in the result if the argument is true.

@skip(if: Boolean) Skip this field if the argument is true.

These two are default directives. There is also a possibility to declare custom directives.

```gql
directive @upper on FIELD_DEFINITION

type Query {
hello: String @upper
}
```

---

### Fragments

Sometimes you need the repeat a set of fields that you want to fetch. Fragments could be a good way to make your code more slim and easier to read.

```gql
{
  leftComparison: hero(episode: EMPIRE) {
    ...comparisonFields
  }
  rightComparison: hero(episode: JEDI) {
    ...comparisonFields
  }
}

fragment comparisonFields on Character {
  name
  appearsIn
  friends {
    name
  }
}
```

https://7sgx4.sse.codesandbox.io/

---

### Naming conventions

Field names should use camelCase. Many GraphQL clients are written in JavaScript, Java, Kotlin, or Swift, all of which recommend camelCase for variable names.

Type names should use PascalCase. This matches how classes are defined in the languages mentioned above.

Enum names should use PascalCase.

Enum values should use ALL_CAPS, because they are similar to constants.

```gql
type Book {
  titleName: String
  author: Author
}
```

```gql
enum AllowedColor {
  RED
  GREEN
  BLUE
}
```



---

### Example


```gql
var { graphql, buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },
};

// Run the GraphQL query '{ hello }' and print out the response
graphql(schema, '{ hello }', root).then((response) => {
  console.log(response);
});
```

---

## Mutation

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

https://apollo-fullstack-tutorial.herokuapp.com/

---

## Subscription

This is not as widely used as the other two. The syntax is very simular to mutation with input variable. This operation is results in a push by the server instead of poll from the client, and might require some different setup (probably involve websocket instead of http).

An example of a subscription facebook post that is beeing subscribed to.

```gql [1-12|14-17]
subscription StoryLikeSubscription($input: StoryLikeSubscribeInput) {
  storyLikeSubscribe(input: $input) {
    story {
      likers {
        count
      }
      likeSentence {
        text
      }
    }
  }
}

input StoryLikeSubscribeInput {
  storyId: string
  clientSubscriptionId: string
}
```


`````
