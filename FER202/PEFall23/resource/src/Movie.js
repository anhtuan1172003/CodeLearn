import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
import { Table, Container, Form} from 'react-bootstrap';
import axios from 'axios';

  //Lấy DB của movies
  const Movies = () =>{
  const [movies, setMovies] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [movie_stars, setMovie_stars] = useState([]);
  const [stars, setStars] = useState([]);
  const [search, setSearch] = useState('');
  const [searchType, setSearchType] = useState('movie');
//join 2 bảng
  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const fetchData = async () => {
  //   try {
  //     const moviesResponse = await axios.get('http://localhost:9999/movies');
  //     const directorsResponse = await axios.get('http://localhost:9999/directors');
  //     const starsResponse = await axios.get('http://localhost:9999/stars');
      
  //     setMovies(moviesResponse.data);
  //     setDirectors(directorsResponse.data);
  //     setStars(starsResponse.data);
  //   } catch (error) {
  //     console.error('Error fetching data: ', error);
  //   }
  // };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseMovie = await axios.get('http://localhost:9999/movies');
        const responseDirector = await axios.get('http://localhost:9999/directors');
        const directorsMap = responseDirector.data.reduce((acc, director) => {
          acc[director.id] = director.FullName;
          return acc;
      }, {});
        const responseMovie_Star = await axios.get('http://localhost:9999/movie_star');
        const responseStar = await axios.get('http://localhost:9999/stars');
        const responseProducer = await axios.get('http://localhost:9999/producers');
        setMovies(responseMovie.data);
        setDirectors(directorsMap);
        setMovie_stars(responseMovie_Star.data);
        setStars(responseStar.data);
        setProducers(responseProducer.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const getDirectorNameById = directorId => {
    const director = directors.find(director => director.id === directorId);
    return director ? director.name : 'Unknown';
  };

  const getStarNameById = starId => {
    const star = stars.find(star => star.id === starId);
    return star ? star.name : 'Unknown';
  };

  //Lấy DB của producers
  const [producers, setProducers] = useState([]);

  useEffect(() => { fetchProducer(); }, [producers]);
  const fetchProducer = async () => {
    const response = await axios.get('http://localhost:9999/producers');
    setProducers(response.data);
  };
  //Lấy DB của producers
  
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const filteredMovies = movies.filter((movie) =>
    movie.Title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', marginTop:'70px' }}>

  {/* phần Producer */}
      <div>
        <h1 style={{marginTop: '60px'}}>Producer</h1>
        <tbody>
          {producers.map(producer => (
            <tr key={producer.id}>
              <Link style={{ textDecoration: 'none' }}>
                <li>{producer.Name}</li>
              </Link>
            </tr>
          ))}
        </tbody>
      </div>
{/* phần Producer */}

{/* bảng movie */}
      <div>
        <Container>
          <h1 style={{ fontWeight: '500px', paddingLeft: '350px' }}>Movie Management</h1>
          <Form style={{width:'40%', marginLeft: '20%', marginBottom:'20px'}}>
            <input
              type="text"
              placeholder={`Enter movie title to search ${
                searchType === 'movie' ? '...' : ''
              }`}
              value={search}
              onChange={handleSearchChange}
              className="form-control"
            />
          </Form>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Id</th>
                <th>Title</th>
                <th>ReleaseDate</th>
                <th>Description</th>
                <th>Language</th>
                <th>Director</th>
                <th>Stars</th>
              </tr>
            </thead>
            <tbody>
              {filteredMovies.map((movie) => (
                <tr key={movie.id}>
                  <td>{movie.id}</td>
                  <td>{movie.Title}</td>
                  <td>{movie.ReleaseDate}</td>
                  <td>{movie.Description}</td>
                  <td>{movie.Language}</td>
                  {/* join 2 bang */}
                  {/* <td>{directors[movie.directorId-1]?.name}</td>
                  <td>{stars[movie.starId-1]?.name}</td> */}
                  <td>
                    {directors[movie.DirectorId]}
                  </td>
                  <td>
                    {stars[movie_stars[movie.id - 1]?.MovieId]?.FullName}
                    {/* {getStarNamesByMovieId(movie.id)} */}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </div>
    </div>
  )
              };
export default Movies;