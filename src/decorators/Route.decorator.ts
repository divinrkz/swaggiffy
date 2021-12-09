function Route(target: any) {
    console.log('Consoling target', target);

 
    // save a reference to the original constructor
    var original = target;
   
    // a utility function to generate instances of a class
    function construct(constructor: any, args: any) {
      var c : any = function (this: any) {
        return constructor.apply(this, args);
      }
      c.prototype = constructor.prototype;
      return new c();
    }
   
    // the new constructor behaviour
    var f : any = function (...args:any) {
      console.log("New: " + original.name);
      return construct(original, args);
    }
   
    // copy prototype so intanceof operator still works
    f.prototype = original.prototype;
   
    // return new constructor (will override original)
    return f;
  }


export {Route};