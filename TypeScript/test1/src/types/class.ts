
class User {
   private f_name: string;
   private l_name: string;
   readonly id:number;

    constructor(f_name: string, l_name:string ,id:number) {
        this.f_name = f_name;
        this.l_name = l_name;
        this.id = id;
    }

    //functions in classes are called methods 
  public printName = (): string => this.f_name +" "+this.l_name;
  public setName = (f_name: string, l_name:string): void => {this.f_name = f_name,this.l_name = l_name;};
set setFirstName(name:string){
    this.f_name = name;
}
};

class Course extends User{
    private students:Array<string>;
    private name:string;
    constructor(name:string,f_name: string, l_name:string ,id:number)
    {  
        super(f_name,l_name,id); // initiate parent class constructor
        this.name=name
        this.students = [`${this.printName()}`]

    };
    get displayDetails ():{c_name:string;student:string[];}{ return {c_name:this.name,student:this.students};}
};
const John = new Course("js intro","John", "patrick",10);
John.setFirstName ="Onyango"; //setter
console.log(John.printName(),John.displayDetails) //getter