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

`1. Unhandled Rejection (Asynchronous code)`
`2. Uncaught Exception (Synchronous code)`
