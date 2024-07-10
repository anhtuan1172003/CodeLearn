import {useParams, useNavigate} from "react-router-dom";
import {useState, useEffect} from 'react';
import {button} from 'react-bootstrap';

export default function ShowInfor() {
    //get paremeter on URL
    const {name, age} = useParams();
    const [count, setCount] = useState(0);
    const dieuhuong= useNavigate;

useEffect(()=>{

    //components updated
    if(count!=0)
    dieuhuong("/home");
},[count])

    return(
        <div>
            <h3>Welcome to ShowInfor page</h3>
            Your fullname: {name}<br/>
            AGE: {age}
            <button onClick={()=>setCount(count+1)}>Back to home </button>
        </div>
    )
}