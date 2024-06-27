// export default function PrinData(props) {
//     return (
//         <main>
//             <h1>{props.title}</h1>
//             <button>{props.children}</button>
//             <div>{props.data}</div>
//         </main>
//     );
// }
import './Style.css';

export default function PrinData({data=[], title, children}) {
    return (
        <main className="container">
            <h1 style={{textAlign: "center", color:"red"}}>{title}</h1>
            <button style={{backgroundColor: "pink", color:"white"}}>{children}</button>
            <div>
                <table className="tbl-student">
                    <thead>
                        <tr>
                            <th>ID</th><th>Name</th><th>age</th><th>Gender</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map(s =>(
                                <tr>
                                    <td>{s.id}</td>
                                    <td>{s.name}</td>
                                    <td>{s.age}</td>
                                    <td>{s.gender}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </main>
    );
}