import { SwaggifyModel } from "./models/User";


@SwaggifyModel()
export class User {
  
    name: string;
    age: number;
    birthDate: Date;
    active: boolean;
    
};
