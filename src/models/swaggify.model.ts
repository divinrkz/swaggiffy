import { Model } from "../decorators/Model.decorator";
import { Route } from "../decorators/Route.decorator";


// @Route
class SwaggifyModel {
  
    private name: string = 'sd';
    private size: number = 2;

    public getName() {
        console.log('dsfa')
    }
};


export default SwaggifyModel;
