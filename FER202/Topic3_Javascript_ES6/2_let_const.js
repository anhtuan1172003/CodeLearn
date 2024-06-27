function sumNumber() {
    let total = 0;
    for (let i = 0; i < 10; i++) {
        total += i;
    }
    console.log("Sum 0 ->9 = " + total);
}
sumNumber();

function areaCircle(radius) {
    const PI = 3.14;
    if (radius > 0) {
        //PI=3.1415 => error
        console.log(`Area of circle: ${PI * radius * radius}`);
    }
    else
        console.log("Radius value must be greater than zero");
}
areaCircle(10);