// import 'reflect-metadata';
// export * from './globals';
// export * from './decorators/Schema';
// export * from './helpers/registerDefinition';
// export * from './errors/SwaggiffyError';
// export * from './Swaggiffy';

import { registerSchema } from "./helpers/registerSchema";
import { Swaggiffy } from "./Swaggiffy";

const express = require('express');
const app = express();


app.listen(5008, () => {
    console.log('Server is running 2');
});

 new Swaggiffy().setupExpress(app).swaggiffy();



 const schema = {
    firstName: 'string',
    lastName: 'string',
    age: 15,
};

registerSchema('User', schema);
