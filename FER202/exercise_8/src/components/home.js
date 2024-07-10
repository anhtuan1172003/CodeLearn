import {Link} from "react-router-dom";

export default function Home() {
    const fullname ="Ngoc Hoang";
    const age = 20;
    return(
        <div>
            <h3>Welcome to homa page</h3>
            <Link to={`/info/${fullname}/and/${age}`}>Show fullname</Link>
        </div>
    )
}