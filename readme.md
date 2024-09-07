# Express Error Handling Library

## Descripción

Esta biblioteca proporciona un sistema de manejo de errores estandarizado para aplicaciones Express. Incluye una clase base ApiError que puede extenderse para crear errores personalizados, y un middleware centralizado errorHandler para capturar y manejar todos los errores en la aplicación.

El objetivo es simplificar y estandarizar el manejo de errores, haciendo que tu código sea más limpio, fácil de mantener, y consistente en las respuestas de error.

## Características

- *Clases de errores personalizadas*: Define y utiliza clases de error que extienden de ApiError para manejar errores específicos como NotFoundError, ValidationError, UnauthorizedError, etc.
- *Manejo centralizado de errores*: El middleware errorHandler captura todas las excepciones y las gestiona de forma coherente.
- *Manejo de errores en funciones asíncronas*: Utiliza asyncHandler para manejar errores en funciones asíncronas sin necesidad de usar try-catch en todas las rutas.
- *Compatibilidad con entornos de desarrollo*: Muestra las trazas de la pila (stack) en entornos de desarrollo o pruebas para facilitar la depuración.

## Instalación

Instala la biblioteca usando npm:

```bash
npm install express-error-handler-lib
```

## Uso

### 1. Clases de errores personalizadas
Extiende la clase BaseError para definir tus propios errores. A continuacion se muestran algunos ejemplos de como puedes crear errores personalizados como NotFoundError.

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

### 2. Uso de errorHandler
El errorHandler es el middleware que captura todos los errores que ocurren en tu aplicacion express. Debe ser agregado al final de todas las rutas y middlewares.

#### Implementacion de errorHandler
```typescript
app.get('/', console.log('x respose'))
app.use(errorHandler);
```

### 3. Uso de asyncHandler globalmente


```typescript
// Middleware global que aplica asyncWrapper a cada manejador
app.use((req, res, next) => {
  // Recorrer el stack de middlewares y rutas
  req.app._router.stack.forEach((middlewareLayer) => {
    if (middlewareLayer.route) {
      // Recorre todas las rutas y envuelve los manejadores
      middlewareLayer.route.stack.forEach((layer) => {
        const originalHandler = layer.handle;
        if (originalHandler.constructor.name === 'AsyncFunction') {
          // Si es una función asíncrona, la envolvemos con asyncWrapper
          layer.handle = asyncWrapper(originalHandler);
        }
      });
    }
  });
  next(); // Sigue con el siguiente middleware
});
```