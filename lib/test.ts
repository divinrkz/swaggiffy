import { Schema } from './decorators/Schema'
import { registerSchema } from './helpers/registerSchema';

@Schema()
class Test {   
    username: string;
    password: string;
}



registerSchema('UserSchema', schema)