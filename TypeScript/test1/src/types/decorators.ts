//create decorator function
const Logger = (constructor:Function)=>{
    console.log(constructor)
}
//call decorator using @ before defining class
@Logger
class persons {

    public names:string; 

    constructor(input:string){
        this.names=input
    }

    get  showName():string {return this.names;}
}

//using constractor factory used for logging custom params in decorator

//initiate function to be used as decorator param

const customDec = (custStr:string)=>(constructor:Function)=>console.log(custStr);
@Logger //RUNS LAST
@customDec("Custom message") //RUNS FIRST
class persons2 {

    public names:string; 

    constructor(input:string){
        this.names=input
    }

    get  showName():string {return this.names;}
}


// adding decorators to props

// target is class, prop is class prop decorated

function Log(target:any,prop:any){
    console.log(target,prop)
}
class Product <T> {
@Log //call decorator before prop    
title:T;
price:number;

constructor(name:T,val:number){
    this.title= name;
    this.price= val;

}
}