//Dinh nghia ham theo phuong phap truyen thong

function add(a,b){
return a+b;
}
//Dinh nghie ham theo cu phap arrow function
let add1= (a,b)=>{
    return a+b;
};
let add2= (a,b)=>a+b;

console.log(`add = ${add(10,20)}`);
console.log(`add1 = ${add1(10,20)}`);
console.log(`add2 = ${add2(10,20)}`);

//ham co 1 tham so khong co gia tri tra ve

let printName = name => console.log(`My name's ${name}`);
printName('AbC');

// Ham khong co tham so va ham khong co gia tri tra ve
let showName =()=> console.log("Fullname is AbC");
showName();