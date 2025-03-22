import { useState, useEffect } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

export default function MovieAddstar() {
    const { id } = useParams(); // Get the movie ID from the URL
    const navigate = useNavigate();
    const [movie, setMovie] = useState();
    const [mStar, setMStar] = useState([]);  // For the current stars of the movie
    const [star, setStar] = useState([]);  // For the selected stars
    const [allStars, setAllStars] = useState([]);  // List of all available stars
    const [mRelease, setMRelease] = useState();
    const [mDes, setMDES] = useState();
    const [mTitle, setMTitle] = useState();
    const [mPro, setMPro] = useState();
    const [mDirec, setMDirec] = useState();
    const [mGenres, setMGenres] = useState();

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
                setMStar(movie.stars);
                setMDES(movie.description);
                setMDirec(movie.director);
                setMPro(movie.producer);
                setMRelease(movie.release);
                setMGenres(movie.genres);
            })
            .catch(error => console.log(error));
    }, [id]);

    // Handle checkbox changes
    const handleStarChange = (event) => {
        const { value, checked } = event.target;
        setStar(prevStars => {
            if (checked) {
                return [...prevStars, value];  // Add the selected star
            } else {
                return prevStars.filter(star => star !== value);  // Remove the deselected star
            }
        });
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
                producer:mPro,
                genres: mGenres,
                description: mDes,
                stars: star,
                director: mDirec
            };

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
                                key={s.id}  // Assuming `s.id` is unique for each star
                                type="checkbox"
                                label={s.fullname}  // Assuming `s.fullname` is the star's name
                                value={s.id}
                                checked={mStar.includes(s.id) || star.includes(s.id)} // Mark the current and selected stars as checked
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
