// // //create decorator function

// // //decorators ececute when class is defined and can run even without class instance
// // const Logger = (constructor:Function)=>{
// //     console.log(constructor)
// // }
// // //call decorator using @ before defining class
// // @Logger
// // class persons {

// //     public names:string; 

// //     constructor(input:string){
// //         this.names=input
// //     }

// //     get  showName():string {return this.names;}
// // }

// // const b = new persons("john"); 

// //decorator factories are  decorators that return decorators
// //decorators factories are used to pass custom data into decorator functions

// // const Logger = (name:string)=>{
// //   return (constructor:Function)=>{
// //        console.log(name) //outputs john
// //        console.log("Logger")
// //   }
// // }
// // @Logger("john")
// // class persons {

// //     public names:string; 

// //     constructor(input:string){
// //         this.names=input
// //     }

// //     get  showName():string {return this.names;}
// // }

// //using decorators to add logics to code
// // const withTemplate = (hookID: string)=>{ //pass custpm params to factory
// //     return (constructor: any) => { //return your decorator
// //         let persons = new constructor(); //create instance
// //         let hook = document.getElementById(hookID);
// //         if (hook) {
// //             let container = document.createElement('h1');
// //             container.innerHTML = "hello " + persons.names; //output data accesed from the class props
// //             hook.appendChild(container);
// //         }
// //         console.log("tenoolate")
// //     }
// // }
// // @Logger('names')   // you can stack multiple decorators to a class, they are executed bottom up
// // @withTemplate('app')
// // class persons {

// //     public names = "kofii";

// //     constructor(input: string) {

// //     }

// //     get showName(): string { return this.names; }
// // }
// // let p = new persons("john")

// //property decorators
// //property decorators have two params property prototype and property name

// const Logger = (target:any,propName: string | symbol)=>{
//   console.log("target: ",target);
//   console.log("name: ",propName);
// }

// //accessors, methods  and paramater dec
// //accessor(get/set) decorators take three args target,name,descriptor
// const acessor = (target:any,name:string,descriptor:PropertyDescriptor) =>{
//   console.log("acc_target: ",target);
//   console.log("acc_name: ",name);
//   console.log("acc_descriptor: ",descriptor);
// }
// // //method decorators also take three args target,name,descriptor
// // const methoddec = (target:any,name:string,descriptor:PropertyDescriptor) =>{
// //   console.log("met_target: ",target);
// //   console.log("met_name: ",name);
// //   console.log("met_descriptor: ",descriptor);
// // }
// // //method decorators also take three args target,name,descriptor
// // const paramdec = (target:any,name:string,pos:number) =>{
// //   console.log("param_target: ",target);
// //   console.log("param_name: ",name);
// //   console.log("param_pos: ",pos);
// // }

// // class Products {
// //   @Logger
// //   title: string;
// //   private _price:number

// //   constructor(p:number,n:string){
// //     this.title =n;
// //     this._price=p
// //   }

// //   @acessor
// //   set price(amount:number){
// //     if(amount < 0) console.log("amount must be greater than 0")
// //    this._price = amount
// //   }

// //   @methoddec
// //   priceWithtext(@paramdec text:string){
// //     return this.price + text
// //   }
// // }
// const AutoBind = (target: any, name: string, descriptor: PropertyDescriptor) => {
//   const originalMetghod = descriptor.value; //extract target method
//   const newDescriptor: PropertyDescriptor = {
//     enumerable: false,
//     configurable: true,
//     get() {
//       const bindFunction = originalMetghod.bind(this); // add getter bind instance
//       return bindFunction;
//     }
//   }

//   return newDescriptor  //return new method configuration
// }
// class Printer {
//   message = "this works"
//   @AutoBind
//   showMessage(): void {
//     console.log(this.message);
//   }
// }
// const printer = new Printer();

// document.querySelector("button")?.addEventListener('click', printer.showMessage)


interface ValidatorConfig {
  [property: string]: {
    [validatableProperty: string]: string[]
  }
}

const registeredValidators: ValidatorConfig = {};

const Required = (target: any, name: string) => {
  registeredValidators[target.constructor.name] = {
    [name]: ['required']
  }

}
const PositiveNumber = (target: any, name: string) => {
  registeredValidators[target.constructor.name] = {
    [name]: ['positive']
  }
}

const validator = (obj: any) => {
  const config = registeredValidators[obj.constructor.name]
  if (!config) {
    return true;
  }

  for (const prop in config) {
    for (const validator of config[prop]) {
      switch (validator) {
        case 'required':
          return !!obj[prop];
        case 'positve':
          return obj[prop] > 0
      }
      return true
    }
  }
}
class Courses {

  title: string;
  private _price: number

  constructor(p: number, n: string) {
    this.title = n;
    this._price = p
  }


}