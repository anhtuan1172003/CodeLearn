import { useEffect, useState } from "react";

export default function Counter() {
    //Khai báo 1 state để quản lý trạng thái dữ liệu cho biến Count
    const [count, setCount] = useState (0);

    //Kiểm soát vòng đời (lidecycle) của component counter
    useEffect (() => {
        //componentDidMount; componentDidUpdate
        console.log("Kiểm soát hoạt động gắn component vào DOM, sự thay đổi trạng thái của count");
        //componentWillUnMount
        return() => console.log("Hoàn tất việc gắn conponent vào DOM hoặc sau khi đã thay đổi Count")
    },[count]);

    return(
        <div>
            <p>You Clicked: {count} times</p>
            <button onClick={()=> setCount(count+1)}>Click me</button>
        </div>
    )
}