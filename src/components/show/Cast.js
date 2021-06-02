// React Component to display the Cast of a TV Show
import React from 'react';

import IMG_NOT_FOUND from '../../images/not-found.png';

const Cast = ({ cast }) => {
  return (
    <div>
      {cast.map(({ person, character, voice }, key) => (
        <div key={key}>
          <div>
            <img
              src={person.image ? person.image.medium : IMG_NOT_FOUND}
              alt="cast-person"
            />
          </div>
          <div>
            <span>
              {person.name} | {character.name} {voice ? '| Voice' : ''}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cast;
