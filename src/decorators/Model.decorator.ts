const Model = (target: any) => {
    console.log(target);
    // "target" is the constructor of the previous class

    return (target: Function) => {
    console.log(Object.getOwnPropertyNames(target))
        
    }
  }

export {Model};