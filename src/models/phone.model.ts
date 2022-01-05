import { SwaggifySchema } from "../lib/decorators";

@SwaggifySchema()
export class Phone {
    firstName = "";
    lastName = "";
    phone = 0;
    birthDate: Date = new Date();
    isActive = false;
}


@SwaggifySchema("PersonDTO")
export class Person {
    firstName = "";
    lastName = "";
    phone = 0;
    birthDate: Date = new Date();
    isActive = false;
}