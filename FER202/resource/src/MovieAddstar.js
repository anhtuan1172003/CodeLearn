import { useState, useEffect } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

export default function MovieAddstar() {
    const { id } = useParams(); // Get the movie ID from the URL
    const navigate = useNavigate();
    const [movie, setMovie] = useState("");
    const [star, setStar] = useState([]); // Danh sách ID star đã chọn
    const [allStars, setAllStars] = useState([]); // List of all available stars
    const [mRelease, setMRelease] = useState("");
    const [mDes, setMDES] = useState("");
    const [mPro, setMPro] = useState("");
    const [mDirec, setMDirec] = useState("");
    const [mGenres, setMGenres] = useState([]);

    useEffect(() => {
        // Fetch stars
        fetch("http://localhost:9999/stars")
            .then(res => res.json())
            .then(result => setAllStars(result))
            .catch(error => console.log(error));

        // Fetch movie details
        fetch(`http://localhost:9999/movies/${id}`)
            .then(res => res.json())
            .then(movie => {
                setMovie(movie.title);
                // Đảm bảo star IDs được lưu ở cùng định dạng
                const starIds = movie.stars.map(starId => 
                    typeof starId === 'string' ? starId : String(starId)
                );
                setStar(starIds);
                setMDES(movie.description);
                setMDirec(movie.director);
                setMPro(movie.producer);
                setMRelease(movie.release);
                setMGenres(movie.genres);
                console.log("Loaded stars:", starIds); // Debug
            })
            .catch(error => console.log(error));
    }, [id]);

    // Handle checkbox changes
    const handleStarChange = (event) => {
        const { value, checked } = event.target;
        console.log("Checkbox changed:", value, checked); // Debug
        
        setStar(prevStars => {
            if (checked) {
                return [...prevStars, value]; // Add the selected star
            } else {
                return prevStars.filter(s => s !== value); // Remove the deselected star
            }
        });
    };

    // Hàm kiểm tra xem một star có được chọn không
    const isStarSelected = (starId) => {
        // Chuyển đổi để đảm bảo so sánh cùng kiểu dữ liệu
        const id = String(starId);
        const result = star.map(s => String(s)).includes(id);
        console.log(`Checking star ${starId}: ${result}`); // Debug
        return result;
    };

    function handleUpdate(e) {
        e.preventDefault();
        let message = "";
        let status = true;
        if (star.length === 0) {
            message += "You must choose at least one star!";
            status = false;
        }
        if (!status) {
            alert(message);
        } else {
            const updatedMovie = {
                title: movie,
                release: mRelease,
                producer: mPro,
                genres: mGenres,
                description: mDes,
                stars: star,
                director: mDirec
            };

            console.log("Updating movie with stars:", star); // Debug

            fetch(`http://localhost:9999/movies/${id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify(updatedMovie),
            })
                .then(resp => resp.json())
                .then(movieUpdated => {
                    alert("Update success! Id: " + movieUpdated.id);
                    navigate("/movie");
                })
                .catch(err => console.log(err));
        }
    }

    return (
        <Container>
            <Row>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>Movie Title</Form.Label>
                        <Form.Control value={movie} disabled />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Star</Form.Label>
                        {allStars?.map(s => (
                            <Form.Check
                                key={s.id}
                                type="checkbox"
                                label={s.fullname}
                                value={s.id}
                                checked={isStarSelected(s.id)}
                                onChange={handleStarChange}
                            />
                        ))}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Button onClick={handleUpdate}>Update</Button>
                    </Form.Group>
                </Col>
            </Row>
        </Container>
    );
}