import "reflect-metadata";
import { Schema } from "./decorators/Schema";
import { Swaggify } from "./Swaggify";

console.log('ganho');

@Schema()
class User {
    firstName: string = 'Name'
    lastName: string = 'DJ'
}
// export * from "./globals";
// export * from "./decorators/Schema";
// export * from "./errors/SwaggifyError";
// export * from "./Swaggify";

new Swaggify().test();
