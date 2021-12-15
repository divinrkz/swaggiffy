import { Model } from "../decorators/Model.decorator";
import { Route } from "../decorators/Route.decorator";


@Model()
class UserModel {
  
    private name: string = 'sd';
    private size: number = 2;
    private age: number = 2;
    private gender: number = 2;
    private numberOfAge: number = 2;
    private numberOfSize: number = 2;
    
};



export default UserModel;
