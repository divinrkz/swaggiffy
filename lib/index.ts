// import 'reflect-metadata';
// export * from './globals';
// export * from './decorators/Schema';
// export * from './helpers/registerDefinition';
// export * from './errors/SwaggiffyError';
// export * from './Swaggiffy';

import mongoose from 'mongoose';

import { Schema } from './decorators/Schema';
import { registerSchema } from './helpers/registerSchema';
import { Swaggiffy } from './Swaggiffy';

const express = require('express');
const app = express();

app.listen(5008, () => {
    console.log('Server is running 2');
});

const schema = {
    firstName: 'string',
    lastName: 'string',
    age: 15,
};

registerSchema('User1', schema);

@Schema('User2')
class Schema2 {
    username: string = 'test';
    password: string = 'test';
}

const schema3 = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    binary: Buffer,
    living: Boolean,
    updated: { type: Date, default: Date.now },
    age: { type: Number, min: 18, max: 65 },
    array: [],
    ofString: [String],
    ofNumber: [Number],
    ofDates: [Date],
    ofBuffer: [Buffer],
    ofBoolean: [Boolean],
    ofArrays: [[]],
    ofArrayOfNumbers: [[Number]],
    nested: {
        stuff: { type: String, lowercase: true, trim: true },
    },
    map: Map,
    mapOfString: {
        type: Map,
        of: String,
    },
});

registerSchema('User3', schema3);

new Swaggiffy().setupExpress(app).swaggiffy();
