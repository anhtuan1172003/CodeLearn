function sumNumber(...numbers) {
    let total=0;
    for (const item of numbers) {
       total+=item; 
    }
    return total;
}
console.log(`Sum1=${sumNumber(10,120)}`);
console.log(`Sum2=${sumNumber(10,12,0,10)}`);
console.log(`Sum3=${sumNumber(10,0,4,1,4,1,5,67)}`);

//toan tu spread (toán tử rải - ...)
const arr1 = [1,2,3];
const arr2 = [4,5,6,7];
const arr3 = [...arr1, 10, 20, ...arr2];

console.log(arr3);
console.log(`Sum4 = ${sumNumber(...arr3)}`);