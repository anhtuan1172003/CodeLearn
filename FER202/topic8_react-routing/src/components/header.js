import { Link } from "react-router-dom";

export default function Header() {
    return (
        <div>
            <ul>
                <li>
                    <Link to={"/"}>Home page</Link>
                </li>
                <li>
                    <Link to={"/contact"}>Contact page</Link>
                </li>
            </ul>
        </div>
    )
}