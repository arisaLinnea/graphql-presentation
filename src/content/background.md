
# Background and intro

GraphQL is a query language and server-side runtime for application programming interfaces (APIs) that prioritizes giving clients exactly the data they request and no more. 
         
- One specification to get and set resources over HTTP
- One endpoint to rule them all /graphql

GraphQL was developed internally by Facebook in 2012 before being publicly (open-sourced) released in 2015.

GraphQL servers are available for multiple languages, including Haskell, JavaScript, Perl, Python, Ruby, Java, C++, C#, Scala, Go, Rust, Elixir, Erlang, PHP, R, and Clojure

---

## GraphQL and REST

Even though there are other alternatives too (SOAP, Falcor, gRPC etc), most of us have only heard of REST or GrapghQL. But what are the differences between those two? 

GrapghQL have one endpoint and you send a query specifying what you want to retrieve. Different applications could go towards the same endpoint and get different data back.
It's good when you want a collection of data from different places. Really good for multiple microservices and mobile apps.

REST have several endpoint and returns a fixed dataobject. In many applications you might need to do more API calls for the same amount of data that one graphQL call would give.
REST is suitable for smaller apps and might be better at complex quieries. REST if often easier to learn than GraphQL.


---

<table>
    <thead>
        <tr>
            <th>REST</th>
            <th>GraphQL</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
            <img alt="rest" width="90%" src="images/my_rest.png" />
            </td>
            <td>
            <img alt="rest" width="90%" src="images/my_gql.png" />
            </td>
        </tr>
    </tbody>
</table>



