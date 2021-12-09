import { Model } from "../decorators/Model.decorator";
import { Route } from "../decorators/Route.decorator";


@Route
class SwaggifyModel {
  
    private name!: string;
    private size!: number;

};


export default SwaggifyModel;
