// import 'reflect-metadata';
// export * from './globals';
// export * from './decorators/Schema';
// export * from './helpers/registerDefinition';
// export * from './errors/SwaggiffyError';
// export * from './Swaggiffy';

import { registerSchema } from './helpers/registerSchema';
import { Swaggiffy } from './Swaggiffy';

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
registerSchema('User1', schema);
registerSchema('User2', schema);
registerSchema('User3', schema);
registerSchema('User4', schema);
registerSchema('User5', schema);
registerSchema('User6', schema);
registerSchema('User7', schema);
registerSchema('User8', schema);
registerSchema('User9', schema);
registerSchema('User10', schema);
registerSchema('User', {

        firstName: 'string',
        lastName: 'string',
        age: 15,
        address: 'sdfadfa'
});
