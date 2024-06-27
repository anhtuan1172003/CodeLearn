import { useEffect, useState, Form, Button } from "react"

export default function ListStudent(props) {
    const students = props.studentData;
    const majors = props.majorData;

    const [major, setMajor] = useState("all");
    const [search, setSearch] = useState("");

    const [majorList, setMajorList] = useState(majors)
    const [studentList, setStudentList] = useState(students);


    useEffect(() => {

        if (major !== "all") {
            let finalResult;
            if (search.length == 0) {
                finalResult = students.filter(s => s.major == major);
            } else {
                finalResult = students.filter(s => (s.major == major) && s.name.toLowerCase().startsWith(search.toLowerCase()));
            }
            setStudentList(finalResult);
        } else {
            let finalResult1 = students.filter(s =>s.name.toLowerCase().startsWith(search.toLowerCase()));
            setStudentList(finalResult1);
        }


    }, [major, search]);
    return (
        <di>
            <input
                type="text"
                placeholder="Enter name to search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <select onChange={(e) => setMajor(e.target.value)}>
                <option value="all">ALL</option>
                {
                    majorList?.map(m => (
                        <option value={m.name} key={m.id}>{m.name}</option>
                    ))
                }
            </select>
            <table border="1">
                <tr>
                    <th>ID</th><th>Name</th><th>Age</th><th>Major</th>
                </tr>
                {
                    studentList?.map(s => (
                        <tr key={s.id}>
                            <td>{s.id}</td>
                            <td>{s.name}</td>
                            <td>{s.age}</td>
                            <td>{s.major}</td>
                        </tr>
                    ))
                }
            </table>
        </di >
    );
}