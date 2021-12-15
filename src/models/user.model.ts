import { SwaggifyModel } from "../decorators/Model.decorator";


@SwaggifyModel()
class User {
  
    name: string;
    age: number;
    birthDate: Date;
    active: boolean;
    
};



export default User;
