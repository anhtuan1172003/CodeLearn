class student{
    constructor(fName, lName){
        //constructor
        this.fName = fName;
        this.lName = lName;
    }
    //method
    showInfo(){
        return `Fullname is: ${this.fName} ${this.lName}`;
    }
}

//Create new object
const s = new student('Tran', 'Anh Tuan');
console.log(s.showInfo());