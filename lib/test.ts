import { Schema } from './decorators/Schema';
import { registerSchema } from './helpers/registerSchema';

@Schema()
class Test {
    username: string;
    password: string;
}

const schema = {
    firstName: 'string',
    lastName: 'string',
    age: 15,
};

console.log(registerSchema(schema));
