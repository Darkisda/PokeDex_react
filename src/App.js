import React, { useState, useEffect } from 'react';
import axios from 'axios'

import pokeball from './assets/pokeball-icon.png'

/*
  *To Do Bolean Button
*/

import './style.css'
import './types.css'
import './stats.css'

function App() {

  const [pokeId, setPokeId] = useState(1)
  const [pokemon, setPokemon] = useState({})
  const [pokeInfo, setPokeInfo] = useState({})
  const [isLoaded, setLoaded] = useState(false)
  
  async function CatchPokemon() {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeId}/`)
    const responseInfo = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokeId}/`)

    setPokemon(response.data)
    setPokeInfo(responseInfo.data)

    setLoaded(true)
  }

  useEffect(()=>{
    CatchPokemon()
    setLoaded(false)
  }, [pokeId])

  function toBetterImg(id){
    if(id < 10) {
      id = "00" + id
    }
    else if (id < 100) {
      id = "0" + id
    }

    return `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png`
  }

  function toFormatID(id) {
    if(id < 10) {
      return "#00" + id
    }
    else if(id < 100) {
      return "#0" + id
    }
    else{
      return "#" + id
    }
  }

  function toUpper(name) {
      name = name.split("")
      name[0] = name[0].toUpperCase()
      return name.join("")
  }

  function renameStatus(name) {
    if(name.length > 13) {
      name = name.split("")
      name[0] = name[0].toUpperCase()
      name[7] = " "
      name[8] = name[8].toUpperCase()
      return name.join("")
    }
    else {
      name = name.split("")
      name[0] = name[0].toUpperCase()
      return name.join("")
    }
  }

  function toDec(num){
    return (num / 10).toFixed(2)
  }

  return (
    <div className="container">
      
      <div onClick={()=> setPokeId(pokeId === 1 ? 1 : pokeId-1)} className="button left" />
      {isLoaded ? 
        
        <div className="poke-container">

          <div className="poke-leftside">

            <section className="poke-card">

            <div className="poke-name-info">
              
              <img src={pokeball} alt="pokeball" className="pokeball"/>
              
              <div className="poke-name">

                <h1>{toUpper(pokemon.name)}</h1>
                <h4>{pokeInfo.genera[2].genus}</h4>
                <p>{toFormatID(pokemon.id)}</p>

              </div>

            </div>

            <img src={toBetterImg(pokeId)} alt={pokemon.name} className="poke-img" />

            <div className="types">
              {pokemon.types.map(types => 
                <div key={types.type.name} className="type" id={types.type.name} > <p>{types.type.name.toUpperCase()}</p> </div>
              )}
            </div>

            </section>

            <div className="stats">
              
              <p><strong>Status base:</strong></p>
              
              <div className="stats-container">
                
                {pokemon.stats.map(stats => 
                  <div key={stats.stat.name} id={stats.stat.name} className="stat" >
                    
                    <p>{renameStatus(stats.stat.name)}</p>
                    <p>{stats.base_stat}</p>

                  </div>
                )}

              </div>

            </div>

          </div>

          <div className="poke-rightside">
            
            {pokeInfo.flavor_text_entries.slice(0,5).map(flavor_text_entries => 
              <p key={flavor_text_entries.flavor_text} className="flavor-text" >{flavor_text_entries.language.name === "en" ? flavor_text_entries.flavor_text : <></>}</p>
            )}

            <section className="poke-info">

              <div className="abilities">
                <p> <strong>Abilities: </strong> {pokemon.abilities.map( abilities => 
                    <>{toUpper(abilities.ability.name)} </>
                )} </p>
                
              </div>

              <div className="shape">
                <p><strong>Shape:</strong> {toUpper(pokeInfo.shape.name)}</p>
              </div>

              <p><strong>Weight: </strong> {toDec(pokemon.weight)} Kg</p>
              <p><strong>Height: </strong> {toDec(pokemon.height)} M</p>

            </section>
          </div>

        </div>

      : 
        <div className="poke-container">
          <img src={pokeball} alt="pokeball" className="loader"/>
        </div>
      }

      <div onClick={()=> setPokeId(pokeId+1)} className="button right" />

    </div>
  );
}

export default App;
