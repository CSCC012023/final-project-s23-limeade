export class User {
    public firstName:string;
    public lastName:string;
    public type:string;

    constructor(firstName:string,lastName:string,type:string){
        this.firstName = firstName;
        this.lastName = lastName;
        this.type = type;
    }
}