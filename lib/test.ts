import mongoose from 'mongoose';
import { Schema } from 'mongoose';
// import { Schema } from './decorators/Schema';
import { registerSchema } from './helpers/registerSchema';

// @Schema()
class Test {
    username: string;
    password: string;
}

const schema = new mongoose.Schema({
    name: String,
    binary: Buffer,
    living: Boolean,
    updated: { type: Date, default: Date.now },
    age: { type: Number, min: 18, max: 65 },
    mixed: Schema.Types.Mixed,
    _someId: Schema.Types.ObjectId,
    decimal: Schema.Types.Decimal128,
    array: [],
    ofString: [String],
    ofNumber: [Number],
    ofDates: [Date],
    ofBuffer: [Buffer],
    ofBoolean: [Boolean],
    ofMixed: [Schema.Types.Mixed],
    ofObjectId: [Schema.Types.ObjectId],
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

registerSchema('User', schema);
