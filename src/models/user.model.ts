import { SwaggifyModel } from "../SwaggifyModel";


@SwaggifyModel()
export class User {
  
    name: string;
    age: number;
    birthDate: Date;
    active: boolean;
    
};
