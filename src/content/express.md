# GraphQL Server and client

## Server

<a href='https://graphql.org/code/' target='_blank'>Code support in GraphQL</a>

---

### GraphQL.js

GitHub: <a href='https://github.com/graphql/graphql-js' target='_blank'>graphql/graphql-js</a>

npm: graphql
The reference implementation of the GraphQL specification, designed for running GraphQL in a Node.js environment.

### Apollo Server

GitHub: <a href='https://github.com/apollographql/apollo-server' target='_blank'>apollographql/apollo-server</a>

npm: apollo-server-express

A set of GraphQL server packages from Apollo that work with various Node.js HTTP frameworks (Express, Connect, Hapi, Koa etc).

### Express GraphQL

GitHub: <a href='https://github.com/graphql/express-graphql' target='_blank'>graphql/express-graphql</a>

npm express-graphql
The reference implementation of a GraphQL API server over an Express webserver. You can use this to run GraphQL in conjunction with a regular Express webserver, or as a standalone GraphQL server.

---

<div class="boldText">graphql:</div>                Core subset for GraphQL functionality
<div class="boldText">express:</div>                A popular web application framework for node
<div class="boldText">express-graphql:</div>        GraphQL server,   /graphql - endpoint
<div class="boldText">apollo-server: </div>         Standalone graphQL server, without web framework
<div class="boldText">apollo-server-express:</div>  GraphQL server with express framework

---

## Client

GraphiQl or GraphQl Playground

---

I terminalfönstret

```gql
curl -X POST \
-H "Content-Type: application/json" \
-d '{"query": "{ hello }"}' \
http://localhost:4000/graphql
```

---

Insomnia / browser console / kod

```js[1|2|3-6|7|8-10]
fetch('/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: JSON.stringify({query: "{ hello }"})
})
  .then(r => r.json())
  .then(data => console.log('data returned:', data));
```

---

Med parametrar

```js[1-3|6-10|12-17|18-21]
type Query {
  rollDice(numDice: Int!, numSides: Int): [Int]
}


var dice = 3;
var sides = 6;
var query = 'query RollDice($dice: Int!, $sides: Int) {
  rollDice(numDice: $dice, numSides: $sides)
}';

fetch('/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: JSON.stringify({
    query,
    variables: { dice, sides },
  })
})
  .then(r => r.json())
  .then(data => console.log('data returned:', data));
```

---

## GraphQl Clients

For advanted applications there are some finished graphQL Clients, eg Apollo Client and Relay. They can help with caching, pagination, validation and optimization of queries based on the schema.
