<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project Architecture & Core Features

This project demonstrates NestJS core concepts, implementing custom and built-in features such as Controllers, Services, Middlewares, Guards, Pipes, Exception Filters, and Lifecycle Hooks.

### 📁 Directory Structure
Below is an overview of the key components under `src/`:

*   **`app.module.ts`**: The root module of the application, importing module dependencies (`EmployeeModule`, `ConfigModule`, `MongooseModule`) and configuring global `LoggerMiddleware`.
*   **`main.ts`**: The entry point of the application. It boots the application and sets up the global `ValidationPipe` with `whitelist` and `forbidNonWhitelisted` options.
*   **`employee/`**: A module demonstrating full CRUD operations, using a DTO (`CreateEmployeeDto`), custom interfaces, guards, and filters.
*   **`product/`**: A simple module containing a controller and service to manage product data.
*   **`user/`**: Contains basic controller examples showing routing decorators.
*   **`database/`**: Implements NestJS **Lifecycle Hooks** to simulate database connection startup and shutdown events, exposed through a `DatabaseController` at `GET /database`.
*   **`middleware/`**: Contains `LoggerMiddleware` used to log request method and URL.
*   **`guards/`**: Includes `AuthGuard` (token check) and `RolesGuard` (using the `@Roles` decorator with roles from headers).
*   **`common/pipes/`**: Includes a custom `UppercasePipe` showing parameter transformation.
*   **`filters/`**: Contains `HttpExceptionFilter` which catches and structures both Nest `HttpException` and generic `Error` occurrences.
*   **`pipetest/`**: Controller endpoints to test custom and built-in pipes (e.g. `ParseIntPipe`).
*   **`env/`**: Implements custom configuration/environment management using `@nestjs/config`, exposed through an `EnvController` at `GET /env`.

---

### 🛡️ Guards & Authorization
*   **`AuthGuard`** (`src/guards/auth/auth.guard.ts`):
    Checks the `Authorization` header for `Bearer 123`. Restricts access to routes where applied.
*   **`RolesGuard`** (`src/guards/roles/roles.guard.ts`):
    Uses a custom decorator `@Roles(Role.Admin)` and the `Reflector` service to match the user's role (passed via `x-user-role` header) against allowed roles.

### 🧪 Pipes (Validation & Transformation)
*   **Global `ValidationPipe`** (`src/main.ts`):
    Filters out properties not defined in the DTO (`whitelist: true`) and throws an error if undefined properties are present (`forbidNonWhitelisted: true`).
*   **Custom `UppercasePipe`** (`src/common/pipes/uppercase/uppercase.pipe.ts`):
    A pipe that transforms string input (e.g. `@Body('name', new UppercasePipe)`) into uppercase.
*   **Built-in Pipes**:
    Examples like `ParseIntPipe` are used to cast query or parameter strings to numbers.

### 🚦 Middleware
*   **`LoggerMiddleware`** (`src/middleware/logger/logger.middleware.ts`):
    A class-based middleware that logs when a request enters (`Middleware started....`) and exits (`Middleware ended....`), demonstrating the use of `next()` to pass control to the handler.

### 🔍 Exception Filtering
*   **`HttpExceptionFilter`** (`src/filters/http-exception/http-exception.filter.ts`):
    Handles all unhandled exceptions. If the exception is not a Nest `HttpException` (e.g., standard `Error`), it maps it to `500 Internal Server Error` and returns a structured response:
    ```json
    {
      "statusCode": 500,
      "message": "Error Message",
      "timestamp": "2026-07-03T15:03:22.000Z",
      "path": "/employee"
    }
    ```

### ⚙️ Configuration & Environment Variables
*   **`ConfigModule` Integration** (`src/app.module.ts`):
    Integrates NestJS `@nestjs/config` globally. Exposes environment variables loaded from the root `.env` file via `ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' })`.
*   **`EnvService`** (`src/env/env.service.ts`):
    A service that wraps the built-in `ConfigService` to fetch environment variables by their keys dynamically (e.g. `this.config.get<string>(key)`).
*   **`EnvController`** (`src/env/env.controller.ts`):
    Exposes a `GET /env` route that uses the `EnvService` to check the current configured `MONGODB_URI` value.

### 🗄️ Database (Mongoose/MongoDB)
*   **`MongooseModule` Integration** (`src/app.module.ts`):
    Establishes connection to MongoDB at startup using `@nestjs/mongoose` and `mongoose` by reading the connection string from environment variables:
    ```typescript
    MongooseModule.forRoot(process.env.MONGODB_URI ?? "")
    ```

---

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## NestJS Lifecycle Hooks

NestJS provides a set of lifecycle hooks that allow you to execute code at specific moments in the application's lifecycle (during initialization, bootstrap, and shutdown phases).

To use these hooks, class providers or controllers must implement the corresponding interfaces (e.g., `OnModuleInit`, `OnApplicationBootstrap`, `OnModuleDestroy`, etc.).

| Lifecycle Hook | Description |
| :--- | :--- |
| **`onModuleInit()`** | Called once the host module's dependencies have been resolved and the module is initialized. |
| **`onModuleDestroy()`** | Called before the host module is destroyed. Used for cleaning up active connections/subscriptions. Requires shutdown hooks enabled. |
| **`afterModuleInit()`** *(optional)* | Called after all modules have been successfully initialized. |
| **`onApplicationBootstrap()`** | Called when the application has been fully bootstrapped and is ready to listen for connections. |
| **`onApplicationShutdown()`** | Called when the application is shutting down (e.g., after receiving a termination signal like `SIGTERM`). Requires shutdown hooks enabled. |

> [!IMPORTANT]
> **Enabling Shutdown Hooks**
>
> By default, shutdown hooks are not enabled automatically because they consume system resources. To utilize shutdown hooks like `onModuleDestroy()` and `onApplicationShutdown()`, you **MUST** call `app.enableShutdownHooks()` in `main.ts` before the application starts listening:
> ```typescript
> async function bootstrap() {
>   const app = await NestFactory.create(AppModule);
>   
>   // Enable shutdown hooks to listen to termination signals (like SIGTERM, SIGINT)
>   app.enableShutdownHooks();
>   
>   await app.listen(3000);
> }
> ```

### Database Module Example:

In this project, `DatabaseService` (`src/database/database.service.ts`) implements these hooks to simulate database connection management:

```typescript
import { Injectable, OnModuleInit, OnApplicationBootstrap, OnModuleDestroy, OnApplicationShutdown } from '@nestjs/common';

@Injectable()
export class DatabaseService implements OnModuleInit, OnApplicationBootstrap, OnModuleDestroy, OnApplicationShutdown {
  private isConnected = false;

  // 1. Called once dependencies are resolved
  onModuleInit() {
    this.isConnected = true;
    console.log(`Database Connected => ${this.isConnected}`);
  }

  // 2. Called when the app is bootstrapped and ready
  onApplicationBootstrap() {
    console.log(`Database Connection Ready => ${this.isConnected}`);
  }

  // 3. Called before the module is destroyed (Cleanup)
  onModuleDestroy() {
    this.isConnected = false;
    console.log(`Database Disconnected => ${this.isConnected}`);
  }

  // 4. Called when the entire application is shutting down (receives signal)
  onApplicationShutdown(signal: string) {
    this.isConnected = false;
    console.log(`Database Connection Close => ${this.isConnected} on signal ${signal}`);
  }

  getStatus() {
    return this.isConnected ? "Connected" : "Disconnected";
  }
}
```

---

## Special Methods

### `configure(consumer: MiddlewareConsumer)`

In NestJS, modules that register middlewares must implement the `NestModule` interface and implement the `configure()` method. It receives a `MiddlewareConsumer` helper object which is used to define and map middlewares to specific routes, request methods, or controllers.

#### Example:

```typescript
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerMiddleware } from './middleware/logger/logger.middleware';

@Module({...})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*'); // Applies to all routes
  }
}
```

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
