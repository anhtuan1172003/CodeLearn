import { useState, useEffect } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Movies() {
    const [movies, setMovies] = useState([]);
    const [stars, setStar] = useState([]);
    const [producers, setProducts] = useState([]);
    const [directors, setDirectors] = useState([]);
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const navigate = useNavigate(); // For programmatic navigation
        const location = useLocation(); // For reading the URL

    useEffect(() => {

         // Check the current URL and extract the genre query parameter
         const params = new URLSearchParams(location.search);
         const genreParam = params.get("genre");
         setSelectedGenre(genreParam); // Set selected genre based on URL

        fetch("http://localhost:9999/movies")
            .then(res => res.json())
            .then(result => {
                const uniqueBrands = new Set();
                result.forEach(p => {
                    if (p.genres && p.genres.length > 0) {
                        p.genres.forEach(b => uniqueBrands.add(b));
                    }
                });
                setGenres(Array.from(uniqueBrands));
                
                setMovies(result)}
            )
            .catch(error => console.log(error));


        fetch("http://localhost:9999/stars")
            .then(res => res.json())
            .then(result => setStar(result))
            .catch(error => console.log(error));

        fetch("http://localhost:9999/producers")
            .then(res => res.json())
            .then(result => setProducts(result))
            .catch(error => console.log(error));

        fetch("http://localhost:9999/directors")
            .then(res => res.json())
            .then(result => setDirectors(result))
            .catch(error => console.log(error));
    }, [location.search]);

    const filteredMovies = selectedGenre 
    ? movies.filter(movie => movie.genres?.includes(selectedGenre))
    : movies;

    const handleGenreClick = (genre) => {
        // Update the URL with the selected genre without reloading the page
        navigate(`/movie/?genre=${genre}`);
        setSelectedGenre(genre); // Set the selected genre in state
    };

    const clearFilter = () => {
        // Clear the filter and navigate back to the base URL without the genre query parameter
        navigate(`/movie/`);
        setSelectedGenre(null); // Clear selected genre state
    };

    return (
        <Container>
            <Row><h1 style={{textAlign: "center"}}>React Application</h1></Row>
            <Row>
            {/* {genres?.map(brand =>{return <Link>{brand}</Link>})} */}
           {/* Render genres as clickable links */}
                <div style={{ display: "flex", flexWrap: "wrap", marginBottom: "15px" }}>
                    {genres?.map((genre, index) => (
                        <span key={index} style={{ marginRight: "10px", marginBottom: "10px" }}>
                            <Link
                                onClick={() => handleGenreClick(genre)} // Change URL on click
                                style={{ textDecoration: "none", color: "#007bff", cursor: "pointer" }}
                            >
                                {genre}
                            </Link>
                        </span>
                    ))}
                    {/* Show a "Clear Filter" link to reset the genre filter */}
                    {selectedGenre && (
                        <span style={{ marginLeft: "10px", marginBottom: "10px" }}>
                            <Link
                                onClick={clearFilter} // Clear the selected genre and reset the URL
                                style={{ textDecoration: "none", color: "red", cursor: "pointer" }}
                            >
                                Clear Filter
                            </Link>
                        </span>
                    )}
                </div>
            </Row>
            <Row>
                <Col md={2}>
                    <Container fluid>
                    <h2>Producers</h2>
                        {
                            producers?.map(b => {
                                return <span><li>{b.name}<br /></li></span>
                            })}
                    </Container>
                </Col>
                <Col md={10}>
                    <Container fluid>
                        <Row>
                            <Col><h2>List Movie</h2></Col>
                            <Link
                                onClick={clearFilter} // Clear the selected genre and reset the URL
                            >
                                Show all movies
                            </Link>
                        </Row>
                        <Row>
                            <Col>
                                <Table hover bordered striped>
                                    <thead>
                                        <tr>
                                            <th>ID</th><th>Name</th><th>release</th><th>Description</th><th>Producers</th><th>Director</th><th>Genres</th><th>Star</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            filteredMovies?.map(p => (
                                                <tr key={p.id}>
                                                    <td>{p.id}</td>
                                                    <td>{p.title}</td>
                                                    <td>{p.release}</td>
                                                    <td>{p.description}</td>
                                                    <td>{
                                                        producers?.find(c => c.id == p.producer)?.name
                                                    }
                                                    </td>
                                                    <td>{
                                                        directors?.find(c => c.id == p.director)?.fullname
                                                    }
                                                    </td>
                                                    <td>{Array.isArray(p.genres) ? p.genres.map((genre, index) => (
                                                        <div key={index}>{genre}</div>
                                                    )) : p.genres}</td>
                                                    <td>
                                                        {
                                                            p.stars.map((star, index) => (
                                                                <div key={index}>{index+1} - {stars?.find(c => c.id == star)?.fullname}</div>
                                                            ))
                                                        }
                                                        <Link to={`/movie/${p.id}/add-stars`}>Edit</Link>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Container>
    )
}