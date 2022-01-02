import { SwaggifySchema } from "../lib/decorators";

@SwaggifySchema()
export class Phone {
    firstName: string = '';
    lastName: string = '';
    phone: number = 0;
    birthDate: Date = new Date();
    isActive: boolean = false;
};


@SwaggifySchema('PersonDTO')
export class Person {
    firstName: string = '';
    lastName: string = '';
    phone: number = 0;
    birthDate: Date = new Date();
    isActive: boolean = false;
};