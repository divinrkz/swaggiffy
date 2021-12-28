import { SwaggifyModel } from "../lib";

@SwaggifyModel()
export class User {
    firstName: string = '';
    lastName: string = '';
    phone: number = 0;
    birthDate: Date = new Date();
    isActive: boolean = false;
};