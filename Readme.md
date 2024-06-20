## Mongoose

    A Powerful Object Data Modeling (`ODM`) Library for MongoDB

## Why we should use Mongoose

- Schema Definition
- Model Creation
- Data Validation
- Querying
- Middleware Support
- Population

## Software Design Patter

- MVC
- Modular

### MVC - (MODEL VIEW CONTROLLERS)

### Modular -> Feature wise module

## Benefits of using Modular Pattern

- Scalability
- Maintainability
- Better Refactoring
- Efficient Development

## Rules/Principle

- DRY(Don't Repeat Yourself)
- Fat Model/ Thin Controller (Controller clean)

`interface -> schema -> model -> db query`

## Request - Response Flow of Modular Pattern

    `client -> route.ts -> controller.ts -> service.ts`

## Validations in MOngoose

- Builtin validation
- Custom Validation
- third party validation

## Static Methods & Instance Methods

## Mongoose Middlewares (Mongoose Hook)

- pre
- post

`Document Middleware` -> before/ after saving data manipulate the data.

`Query Middleware`

`Aggregation Middleware`

`Transaction & Rollback` have 4 principles

- Atomicity
- Consistency
- Isolation
- Durability

## When should we use transaction ?

    Two or more database write operation

## Types of Errors :

## `Operational Error :`

    Errors that we can predict will happen in future.

- invalid user inputs
- failed to run server
- failed to connect database
- invalid auth token

### `Programmatical Error :`

    Error that developers produce when developing

- using undefined variables
- using properties that do not exits
- passing number instead of string
- using req.params instead of req.query

Operational error & Programmatical error can handle in express application using error in express framework

### `1. Unhandled Rejection (Asynchronous code)`

```js
server.close(() => {
  process.exit(1);
});
```

### `2. Uncaught Exception (Synchronous code)`

```js
process.exit(1);
```

## How to do raw searching

Data comes from req.query
searchTerm -> Partial Match & Filter term -> Exact Match

### `Partial Match`

For Partial Match we use regex. we need finalize the field which fields, we ues searching

```js
  let searchTerm = '';
  const queryObj = { ...query };

  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string;
  }

  const studentSearchableFields: string[] = [
    'email',
    'name.firstName',
    'presentAddress',
  ];

  // first changing, searchTerm
  const searchQuery = Student.find({
    $or: studentSearchableFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' }, // []
    })),
  });

```

### `Exact Match`

for exact match we need specific fields, so in req.query object we need to remove different fields like searchTerm , page, limit, sort etc. we use changing the queries.

```js
// filtering for extract match
const excludeFields = ['searchTerm', 'sort', 'limit'];

excludeFields.forEach((elt) => delete queryObj[elt]);

// second changing
const filterQuery = searchQuery
  .find(queryObj)
  .populate('admissionSemester')
  .populate({
    path: 'academicDepartment',
    populate: {
      path: 'academicFaculty',
    },
  });
```

### `sort the document`

```js
// for sort
  let sort = '-createdAt';

  if (query.sort) {
    sort = query.sort as string;
  }

  // third changing
  const sortQuery = filterQuery.sort(sort);
```

### `limit the document`

```js

 let limit = 1;

  if (query.limit) {
    limit = query.limit as number;
  }

  const limitQuery = await sortQuery.limit(limit);

```

### `Pagination`

    Formula: Determine how many documents to show limit and how many to skip = (page - 1) * limit

Example:

- limit = 10, page = 1, skip = 0 [show 10 document on each page]
- limit = 10, page = 2, skip = 10 [show 10 document on each page]
- limit = 10, page = 3, skip = 20 [show 10 document on each page]

Calculation for Skip:

- limit = 10, page = 1, skip = (1 - 1) \* 10
- limit = 10, page = 2, skip = (2 - 1) \* 10
- limit = 10, page = 3, skip = (3 - 1) \* 10
- so, skip = (page - 1) \* limit

```js
// pagination
let page = 1;
let limit = 1;

let skip = 0;

if (query.limit) {
  limit = Number(query.limit);
}

if (query.page) {
  page = Number(query.page);
  skip = (page - 1) * limit;
}

const paginateQuery = sortQuery.skip(skip);
```

### Field limiting

```js

 // field limiting

  let fields = '-__v';

  if (query.fields) {
    fields = (query.fields as string).split(',').join(' ');
  }

  const fieldQuery = await limitQuery.select(fields);

```
