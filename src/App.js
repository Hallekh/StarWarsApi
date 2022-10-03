import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';
import HomePage from './Components/HomePage';
import ShowOne from './Components/ShowOne';
import './Components/ShowOne.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  //api data for all the cards
  const [films,setFilms] = useState([]);
  const loadAllFilms= async ()=>{
    await axios.get('https://swapi.dev/api/films')
      .then((response)=>{
        setFilms(response.data.results);
      })
      .catch((err) => console.log(err));
      }
  //loads the card data
  useEffect(()=>{
    loadAllFilms();
  },[]);
  
  return (
    <BrowserRouter>
      <div className='page-body'>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage films={films}/>}/>
          <Route path="/:id" element={<ShowOne films={films}/>} />
        </Routes>  
        <Footer /> 
      </div> 
    </BrowserRouter>
  );
}

export default App;