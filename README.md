# SWAGGIFY

Swaggiffy is a zero config opensource tool for documenting your Node.js Express APIs and is built on top of Swagger. It is designed to be easy to use and simple, with the goal that anyone can read it. <br>

## Features

-   Automated Swagger Schema Registry.
-   Automated Swagger API Definition Registry.
-   Automatic Swagger file rendering.
-   Clean and Simple Config file.
-   Supports both OpenAPI 2 and OpenAPI 3.
-   Supports for Typescript Classes.
-   Support for Mongoose ORM Schema Objects.
-   Support for Swagger YAML and JSON.
-   Rich CLI.
-   Built on top on Express and Swagger.

And more ...

## Get started

### Install

```bash
npm i swaggiffy #npm
yarn add swaggiffy #yarn
pnpm add swaggiffy #pnpm
```

### Swaggify Configuration

Swaggify creates a clean and simple configuration file. In addition, it create a swagger definition file,
to your preffered path specified in the configuration file.

This is will generate both `swaggiffy.config.json` and `swagger/swagger.json` files.

```bash
npx swaggiffy init -p PORT
```

Generate the config file only.

```bash
npx swaggify generate:config
```

Generate the spec file only.

```bash
npx swaggify generate:spec
```

### Instantiate Swaggify

In your main .js or .ts file.

```js
const { Swaggiffy } = require('swaggiffy'); // Using require
import { Swaggiffy } from 'swaggiffy'; // Using import
```

Build Swaggiffy with your express app.

```js
new Swaggiffy().setupExpress(app).swaggiffy();
```

### Using Swaggiffy

#### Schema Registry

To register a schema

```js
import { registerSchema, registerSchemas } from 'swaggiffy';


registerSchema('Model Name 1', modelObj1); // for plain Js objects
registerSchema('Model Name 2', modelObj2, { orm: 'mongoose' }); // for mongoose model
registerSchema('Model Name 2', modelObj3, { orm: 'sequelize' }); // for sequelize model

registerSchemas([  {'Model Name 1', modelObj1 }, {'Model Name 2', modelObj2, { orm: 'mongoose' }} ]); // for multiple schemas
```

For classes use

```js
import { Schema } from 'swaggiffy';

@Schema('Model')
class Model {
    property1 = '';
    property2 = '';
    property3 = '';
}
```

#### API Definition Registry

We generate API Definition from Express Routers.

`tags`: Tags are swagger groupings
`mappedSchema`: Maps the desired schema registered in swagger to your API Definition.
`basePath`: Base Paths specifies the route for your router.

```js
import { registerDefinition, registerDefinitions } from 'swaggiffy';

registerDefinition(router, { tags: 'Products', mappedSchema: 'Product', basePath: '/products' });

registerDefinitions([
    router1,
    { tags: 'Products', mappedSchema: 'Product', basePath: '/products' },
    router2,
    { tags: 'Users', mappedSchema: 'User', basePath: '/user' },
]);
```

#### Run the App

```bash
node app.js
```

With nodemon we need to exclude files

```bash
nodemon --ignore '*swagger.json' app.js
```

or create a `nodemon.json` file with

```json
{
    "ignore": ["*swagger.json"]
}
```

Tada!, Now access `localhost:PORT/api-docs` to see swagger 😁.

### DEMO

Checkout this repository for demo and additional examples.
[Swaggiffy Samples](https://github.com/divinirakiza/swaggify-samples)

### CONTRIBUTIONS

You are welcome for contributions. Please read our [CONTRIBUTING.md](https://github.com/divinirakiza/swaggiffy/blob/main/CONTRIBUTING.md) file.

### MAINTAINERS

-   Divin Irakiza ([@divinirakiza](https://github.com/divinirakiza))
