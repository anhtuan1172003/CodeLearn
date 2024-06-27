/*Promise-> Kiểm soát hoạt động của một action nào đó
+Resolve-giải quyết-success
+Reject-từ chối

vd:
cost myPromise = new Promise((réolver, reject)={
setTimeout(()=>{
    let number = Match.random(); //[0-1] - float
    if(number<0.5) resolve(number);
    else reject("Error: number is greater than 0.5");

},2000);
})
*/

const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        let number = Math.random(); //[0-1] - float
        if (number < 0.5)
            resolve(number);
        else
            reject("Error: number is greater than 0.5");

    }, 2000);
});

//Dinh nghia 1 ham bat dong bo (Asynchronous function) để tiếp nhận mọi lời gọi từ người dùng
async function generator() {
    //Gọi thông qua hàm promise
    await myPromise
        .then(success => console.log(`Success - Random number is: ${success}`))
        .catch(error => console.log(`Error: ${error}`));
}

generator();
