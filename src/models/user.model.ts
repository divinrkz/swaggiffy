import { Model } from "../decorators/Model.decorator";
import { Route } from "../decorators/Route.decorator";


@Model()
class UserModel {
  
    private _name: string;
    private age: number;
    private birthDate: Date;
    private active: boolean;



    get name(): string {
        return this._name;
    }

    set name(name: string) {
        this._name = name;
    }

    
};



export default UserModel;
