import Utility from "../utils/Utility";

function Route(target: any) {
    console.log('Consoling target', target);


    console.log(Utility.getClassProps(target));
 
    // save a reference to the original constructor
    var original = target;
   
    // a utility function to generate instances of a class
    return function  (target: any): any {
      // Save a reference to the original constructor
      var original = target;
      
      // An utility function to generate instances of a class
      function construct(constructor, args) {
          var c: any = function () {
              return constructor.apply(this, args);
          }
          c.prototype = constructor.prototype;
          return new c();
      }
      
      // The new constructor behaviour
      var f: any = function (...args) {
          console.log(`${prefix}${ts}${msgTrace} ${original.name}`);
          return construct(original, args);
      }
      
      // Copy prototype so intanceof operator still works
      f.prototype = original.prototype;
      
      // Return new constructor (will override original)
      return f;
  };
  }


export {Route};