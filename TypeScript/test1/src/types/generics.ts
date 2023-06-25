const uses = Array <string> // same as string[]

const promise: Promise<string> = new Promise((resolve,reject)=>{
 setTimeout(()=>{
    resolve("User is john")
 },4000)
})

promise.then(data=>console.log(data));
console.log("Hi");


//custom generic tasks
//use extend to set constraints to your generic types
function merge <T extends object,R extends object> (objA:T,objB:R){
  return  Object.assign(objB,objA)
}


//generic with flexibily
interface lengthy {
    length:number;
}

const countAndDescribe = <S extends lengthy>(input:S) => { //we do not need to lock type string/array
    let desc = "HI"

    if(input.length > 0) desc ="no"
    return {input,desc}

}