import { Schema } from './decorators/Schema'
import { registerSchema } from './helpers/registerSchema';

@Schema()
class Test {   
    username: string;
    password: string;
}

const schema = {
    user: {
        type: 'string',
        ref: 'User',
        unique: true,
        required: true
    },
    authorNumber: {
        type: Number,
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}


console.log(registerSchema('UserSchema', schema))