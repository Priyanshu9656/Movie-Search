import React, { useState } from 'react';
import styled from 'styled-components'
import MovieComponent from './MovieComponent';
import MovieInfoComponent from './MovieInfoComponent';
import axios from 'axios';
const Container=styled.div`
display:flex;
flex-direction: column;`

const Header=styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
background-color: black;
color: white;
align-items: center;
padding: 10px;
font-size: 25px;
font-weight: bold;
box-shadow: 0 3px 6px 0 #555;
`

const AppName=styled.div`
display: flex;
flex-direction: row;
align-items:center;
`;

const SearchBox=styled.div`
display: flex;
flex-direction: row;
padding: 10px 10px;
border-radius: 6px;
margin-left:20px;
width: 50%;
background-color: white;
align-items: center;
height: 10px;
`
const SearchIcon=styled.img`
width: 20px;
height: 20px;
`
const SearchInput=styled.input`
color: black;
font-size: 16px;
font-weight: bold;
border: none;
outline: none;
margin-left: 15px;
`

const MovieListContainer=styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
padding: 30px;
gap:5px;
justify-content: space-evenly;
`
const App=()=> {
  const [search,setsearch]=useState("");
  const [timeoutId,settimeoutId]=useState();
  const [movieList,setmovieList]=useState([]);
  const [selectedMovie,onMovieSelect]=useState();

  const fetchData=async (searchString)=>{
    const response= await axios.get(`http://www.omdbapi.com/?s=${searchString}&apikey=84f7a7ec`,);
    console.log(response);
    setmovieList(response.data.Search);
  };
  const f=(event)=>{
    onMovieSelect("");
    clearTimeout(timeoutId);
    setsearch(event.target.value);
    const timeout=setTimeout(()=>fetchData(event.target.value),500)
    settimeoutId(timeout);
  };
  return (
    <>
    <Container>
    <Header>
    <AppName> React Movie App </AppName>
    <SearchBox>
    <SearchIcon src="https://img.icons8.com/search"/>
      <SearchInput placeholder="Search Movie" value={search} onChange={f}/>
    </SearchBox>
    </Header>
    {selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie} onMovieSelect={onMovieSelect}/>}
    <MovieListContainer>
    {
      movieList?.length?(movieList.map((movie,index)=>(<MovieComponent key={index} movie={movie} onMovieSelect={onMovieSelect}/>))):"No Movie Search"
    }
    </MovieListContainer>
    </Container>
    </>
  );
}

export default App;

