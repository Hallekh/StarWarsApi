import axios from 'axios';
import './ShowOne.css';
import React, { useCallback, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';

const ShowOne = ({ films }) => {
    //the states with the characters, planets and starships data for the card
    const [starships,setStarships]=useState([]);
    const [planets,setPlanets]=useState([]);
    const [characters,setCharacters]=useState([]);

    //finding the card that user wants to look at
    const cardId = useLocation().pathname.slice(1);
    const specificCard = films.find((results)=>results.title===decodeURI(cardId));
    
    //function to load starships names from the array containing starships api calls
    const getStarships = useCallback(async () =>{
        let promises=[];
        let starships=[];
        if(specificCard){
            for(let starship of specificCard.starships){
                promises.push(
                    await axios.get(starship)
                        .then((response)=>{
                            starships.push(response.data.name);
                        })
                )
            }
            Promise.all(promises).then(()=>setStarships(starships))
        }        
    },[specificCard])

    //function to load planets names from the array containing planets api calls
    const getPlanets = useCallback(async () =>{
        let promises=[];
        let planets=[];
        if(specificCard){
            for(let planet of specificCard.planets){
                promises.push(
                    await axios.get(planet)
                        .then((response)=>{
                            planets.push(response.data.name);
                        })
                )
            }
            Promise.all(promises).then(()=>setPlanets(planets))
        }        
    },[specificCard])

    //function to load characters names from the array containing characters api calls
    const getCharacters = useCallback(async () =>{
        let promises=[];
        let characters=[];
        if(specificCard){
            for(let character of specificCard.characters){
                promises.push(
                    await axios.get(character)
                        .then((response)=>{
                            characters.push(response.data.name);
                        })
                )
            }
            Promise.all(promises).then(()=>setCharacters(characters))
        }        
    },[specificCard])

    //loads characters, planets and starship data as the user clicks on a card
    useEffect(()=>{
        getStarships();
        getPlanets();
        getCharacters();
    },[films, getStarships, getPlanets, getCharacters])

    return (
        <div className='container'>
            {specificCard ? 
            <>
                <div className='container'>
                <Link to={'/'} className="card-link">Back</Link>
                    <div>
                        <h2>{specificCard.title}</h2>
                    </div>
                    <div>
                        <p>{specificCard.opening_crawl}</p>
                    </div>
                    </div>
                    {/*DISPLAY STARSHIPS*/}
                    <div className="row row-cols-1 row-cols-md-3 g-4">
                        <div className='card'>
                            <h3 className="card-title">STARSHIPS</h3>
                            <div className="card-body">
                                {
                                       specificCard.starships.length>0 ?
                                            starships.map((starship)=>(
                                                <div className='card-text' key={starship}>
                                                    <p className='card-text'>{starship}</p>
                                                </div>
                                            ))
                                            :
                                            <div className='card-text'>
                                                <p className='card-text'>None</p>
                                            </div>
                                }
                            </div>
                        </div>
                    {/*DISPLAY PLANETS*/}
                        <div className='card'>
                            <h3 className="card-title">PLANETS</h3>
                            <div className="card-body">
                                {
                                        specificCard.planets.length>0 ?
                                            planets.map((planet)=>(
                                                <div className='card-text' key={planet}>
                                                    <p className='card-text'>{planet}</p>
                                                </div>
                                            ))
                                            :
                                            <div className='card-text'>
                                                <p className='card-text'>None</p>
                                            </div>
                                }
                            </div>
                        </div>
                    {/*DISPLAY CHARACTERS*/}
                        <div className='card'>
                            <h3 className="card-title">CHARACTERS</h3>
                            <div className="card-body">
                                {
                                    specificCard.characters.length>0 ?
                                    characters.map((character)=>(
                                        <div className='card-text' key={character}>
                                            <p className='card-text'>{character}</p>
                                        </div>
                                    ))
                                    :
                                    <div className='card-text'>
                                        <p className='card-text'>None</p>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </>
                :
                /*loading screen logic or if user clicks on card not in the data*/
                <p className='load-text'>Loading data...<br/><br/>Or info is not available.</p>
            
            }
            </div>
    )}
    export default ShowOne;
