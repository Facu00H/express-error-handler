# Express Error Handling Library

## Table of Contents
- Description
- Features
- Installation
- Usage
- Custom Error Classes
- Using errorHandler
- AsyncHandler
   - What is asyncHandler?
   - Why Use asyncHandler?
   - How Does asyncHandler Work?
   - Benefits of Using asyncHandler
- wrapAsyncRoutes
   - Why Use wrapAsyncRoutes?
   - How Does wrapAsyncRoutes Work?
   - Benefits of Using wrapAsyncRoutes
   - Internal Workings
- Summary

## Description

This library provides a standardized error handling system for Express applications. It includes a base class ApiError that can be extended to create custom errors, and a centralized errorHandler middleware to capture and handle all errors in the application.

The goal is to simplify and standardize error handling, making your code cleaner, easier to maintain, and consistent in error responses.

## Features

- **Custom Error Classes**: Define and use error classes that extend from ApiError to handle specific errors like NotFoundError, ValidationError, UnauthorizedError, etc.
- **Centralized Error Handling**: The errorHandler middleware captures all exceptions and manages them consistently.
- **Error Handling in Asynchronous Functions**: Use asyncHandler to handle errors in asynchronous functions without the need to use try-catch in every route.try-catch en todas las rutas.
- **Development Environment Support**: Displays stack traces in development or test environments for easier debugging.

## Installation

Install the library using npm:

```bash
npm i express-err-handler
```

## Usage

### 1. Custom Error Classes
Extend the BaseError class to define your own errors. Below are some examples of how you can create custom errors such as NotFoundError.

```typescript
import { ErrorCodes } from './types/ErrorCodes';

export class ApiError extends Error {
  statusCode: number;
  errorCode: ErrorCodes;
  isOperational: boolean;

  constructor(message: string, statusCode: number, errorCode: ErrorCodes, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}
```

### 2. Using errorHandler
The errorHandler is the middleware that captures all errors occurring in your Express application. It should be added at the end of all routes and middlewares.

##### Implementacion de errorHandler
```typescript
app.get('/', (req: Request, res: Response, next: NextFunction) => { res.send('test') })
app.use(errorHandler);
```

### 3. AsyncHandler

#### What is asyncHandler?
asyncHandler is a utility middleware used in Express applications to simplify error handling in asynchronous route handlers. It allows you to write asynchronous code in your route handlers without having to use try-catch blocks in every handler. Instead, asyncHandler automatically catches any errors that occur in the asynchronous code and forwards them to the next middleware, usually an error handler.

#### Why Use asyncHandler?
When writing asynchronous route handlers using async/await, you often need to use try-catch blocks to capture any errors and call next(err) to pass the error to the centralized error handler. Doing this manually for every route can clutter your code and lead to repetition.

asyncHandler automates this process by wrapping your asynchronous route handlers and catching any errors that are thrown. This makes your code cleaner and ensures consistent error handling across your routes.

#### How Does asyncHandler Work?

- **Without asyncHandler**: You would need to manually wrap every asynchronous function in a try-catch block:
  ```typescript
  app.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await someAsyncOperation();
      res.json(data);
    } catch (error) {
      next(error);  // You need to explicitly forward the error
    }
  });
  ```

- **With asyncHandler**: You simply wrap your route handler with asyncHandler, and it takes care of catching errors and passing them to the error handler automatically:
```typescript
import { asyncHandler } from './asyncHandler';

app.get('/', asyncHandler(async (req: Request, res: Response) => {
  const data = await someAsyncOperation();
  res.json(data);
}));
```
#### Benefits of Using asyncHandler

1. **Cleaner Code**: You don't need to clutter your route handlers with try-catch blocks in every function.
2. **Automatic Error Forwarding**: If an error occurs in an asynchronous route, asyncHandler ensures that it is automatically forwarded to the next middleware (usually your centralized error handler).
3. **Consistency**: Ensures that errors are handled in a uniform way across all asynchronous routes in your application.

In summary, **asyncHandler** simplifies the way you handle errors in asynchronous functions in an Express app by eliminating the need for repetitive **try-catch** blocks, making your code more maintainable and consistent.

### 4. wrapAsyncRoutes
wrapAsyncRoutes is a utility function used to automatically apply the asyncHandler middleware to all routes in an Express router. It simplifies the process of ensuring that all asynchronous route handlers in a router are properly wrapped in asyncHandler, so you don't have to manually wrap each route individually.

#### Why Use wrapAsyncRoutes?
When you have multiple asynchronous routes in an Express router, you would typically need to wrap each route handler with asyncHandler to catch errors and pass them to the centralized error handler. Doing this for every route can be repetitive and error-prone.

wrapAsyncRoutes automates this process by applying asyncHandler to every route in a router, ensuring consistent error handling without needing to manually wrap each route.

#### How Does wrapAsyncRoutes Work?
- **Without wrapAsyncRoutes**: You would need to manually wrap every asynchronous route handler in asyncHandler:
```typescript
  import { asyncHandler } from './asyncHandler';

  const companyRouter = Router();

  companyRouter.get('/', asyncHandler(async (req, res) => {
    const data = await getData();
    res.json(data);
  }));

  companyRouter.post('/create', asyncHandler(async (req, res) => {
    const result = await createCompany(req.body);
    res.status(201).json(result);
  }));
```
- **With wrapAsyncRoutes**: You can wrap all the routes in the router automatically, saving you from manually applying asyncHandler to each one:
```typescript
  import { wrapAsyncRoutes } from './wrapAsyncRoutes';

  const companyRouter = Router();

  companyRouter.get('/', async (req, res) => {
    const data = await getData();
    res.json(data);
  });

  companyRouter.post('/create', async (req, res) => {
    const result = await createCompany(req.body);
    res.status(201).json(result);
  });

  // Apply wrapAsyncRoutes to automatically wrap all routes in asyncHandler
  app.use('/company', wrapAsyncRoutes(companyRouter));
```

#### Benefits of Using wrapAsyncRoutes
1. Automates Wrapping: It automatically wraps all asynchronous route handlers in asyncHandler, ensuring that errors in any of the routes are caught and forwarded to the error handler.
2. Cleaner Code: Instead of manually applying asyncHandler to each route, you only need to apply wrapAsyncRoutes once per router, making your code less repetitive and easier to maintain.
3. Consistency: Ensures that all routes within a router have uniform error handling for asynchronous functions.

#### How Does wrapAsyncRoutes Work Internally?
wrapAsyncRoutes iterates through each route in the provided Express router and wraps the route handlers in asyncHandler. This ensures that any asynchronous operations in those routes are automatically caught and handled.

```typescript
  import { Router } from "express";
  import { asyncHandler } from "./asyncHandler";

  /**
   * Wraps all asynchronous routes of an Express router with asyncHandler.
   * This ensures that any errors in async functions are automatically passed to the next middleware.
   *
   * @param {Router} router - The Express router whose routes need to be wrapped.
   * @returns {Router} - The same router with all routes wrapped in asyncHandler.
   */
  export const wrapAsyncRoutes = (router: Router): Router => {
    const routes = router.stack;

    routes.forEach((layer: any) => {
      if (layer.route) {
        layer.route.stack.forEach((routeLayer: any) => {
          const originalHandler = routeLayer.handle;
          routeLayer.handle = asyncHandler(originalHandler);
        });
      }
    });

    return router;
  };
```

#### In Summary:
- **Purpose**: wrapAsyncRoutes applies asyncHandler to all routes in an Express router, ensuring automatic error handling for asynchronous routes.
- **Usage**: Instead of manually wrapping each route with asyncHandler, use wrapAsyncRoutes to handle all routes in a router at once.
- **Advantages**: It simplifies code, reduces repetition, and ensures consistent asynchronous error handling across multiple routes.