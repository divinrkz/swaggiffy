import { SwaggifyModel } from "../SwaggifyModel.ts";


@SwaggifyModel()
export class User {
  
    name: string;
    age: number;
    birthDate: Date;
    active: boolean;
    
};
