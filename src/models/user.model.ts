import { SwaggifySchema } from "../lib/decorators";

@SwaggifySchema("UserModel")
export class User {
    firstName = "";
    lastName = "";
    phone = 0;
    birthDate: Date = new Date();
    isActive = false;
}