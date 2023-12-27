import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Character from './Character';

const urlPlanets = 'http://localhost:9009/api/planets';
const urlPeople = 'http://localhost:9009/api/people';

function App() {
  const [characters, setCharacters] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from both endpoints concurrently using Promise.all
        const [peopleResponse, planetsResponse] = await Promise.all([
          axios.get(urlPeople),
          axios.get(urlPlanets)
        ]);

        const peopleData = peopleResponse.data;
        const planetsData = planetsResponse.data;

        // Combine the data from both endpoints
        const combinedData = peopleData.map(person => {
          const homeworldId = person.homeworld;
          const homeworld = planetsData.find(planet => planet.id === homeworldId);

          return {
            ...person,
            homeworld: {
              id: homeworld.id,
              name: homeworld.name,
              // Add other properties if needed
            }
          };
        });

        // Set the combined data in state
        setCharacters(combinedData);
      } catch (error) {
        // Set the error state for handling in the UI
        setError('Error fetching data. Please try again later.');
        console.error('Error fetching data:', error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, []); // Empty dependency array ensures the effect runs only on mount

  return (
    <div>
    <h2>Star Wars Characters</h2>
    <p>See the README of the project for instructions on completing this challenge</p>
    {error && <p style={{ color: 'red' }}>{error}</p>}
    {/* Map over the characters state, rendering a Character at each iteration */}
    {characters.map(character => (
      <Character key={character.id} character={character} />
      
    ))}
  </div>
  );
}

export default App;

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = App
