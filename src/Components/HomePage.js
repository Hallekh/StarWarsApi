import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

export default function HomePage() {
const [films, setFilms] = useState([]);
  
  useEffect(() => {
    axios.get('https://swapi.dev/api/films')
    .then((res) => {
      setFilms(res.data.results);
    })
    .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {films.map( (results) => {
          return <div className='container'>
                  <div className="card" key={results.title}>
                    <div className="card-body">
                      <h2 className="card-header">{results.title}</h2>
                      <p className="card-text">{results.opening_crawl}</p>
                      <p className="card-text">Number of Planets: {results.planets.length}</p>
                      <p className="card-text">Number of Starships: {results.starships.length}</p>
                      <p className="card-text">Characters: {results.characters.length}</p>
                      <p>Release date: {results.release_date}</p>
                      <Link to={`/${results.title}`} className="btn btn-primary active">Detailes</Link>
                    </div>
                  </div>
                </div>
        })}
    </div>
  );
}

