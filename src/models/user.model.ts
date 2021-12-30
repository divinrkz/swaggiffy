import { SwaggifySchema } from "../lib/decorators";

@SwaggifySchema('UserModel')
export class User {
    firstName: string = '';
    lastName: string = '';
    phone: number = 0;
    birthDate: Date = new Date();
    isActive: boolean = false;
};