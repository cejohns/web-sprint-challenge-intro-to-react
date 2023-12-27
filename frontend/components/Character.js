import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Character({ character }) {
  const [showHomeworld, setShowHomeworld] = useState(false);

  const toggleHomeworld = () => {
    setShowHomeworld(!showHomeworld);
  };

  return (
    <div className="character-card" onClick={toggleHomeworld}>
    <h3 className="character-name">{character.name}</h3>
    {/* Add other character details here */}
    {showHomeworld && <p className="character-planet">Planet: {character.homeworld.name}</p>}
  </div>
  );
}

Character.propTypes = {
  character: PropTypes.shape({
    name: PropTypes.string.isRequired,
    homeworld: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    // Add other prop types for character details
  }).isRequired,
};

export default Character;
