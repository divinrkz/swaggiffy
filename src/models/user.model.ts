import { SwaggifyModel } from "../SwaggifyModel";


@SwaggifyModel()
class User {
  
    name: string;
    age: number;
    birthDate: Date;
    active: boolean;
    
};

export {User};
