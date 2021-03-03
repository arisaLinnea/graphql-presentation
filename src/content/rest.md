## REST

RESTful webservices provides an interface to be used by other services to access and manipulate resources.

GET - fetch resource

PUT - update resource

PATCH - update some part of a resource

DELETE - delete resource

POST - add resource

---


## Express.js

```js [7-9|11-13]
import express from 'express';
import fetchAuthors from './fetchAuthors';
import fetchBooks from './fetchBooks';

const app = express();

app.get('/authors', (req, res) => {
  res.json({ authors: fetchAuthors() });
});

app.get('/author/:id/books', (req, res) => {
  res.json({ books: fetchBooks() });
});

app.listen(4000);
```

---

![restful](images/Restful.png)