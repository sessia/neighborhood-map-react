import React from 'react';
import PropTypes from 'prop-types';

const Filter = ({ data, filterPlaces, onMarkerClick }) => {
  const { places, showedPlaces } = data;

  return (
    <aside className="filter">
      <h2 className="filter-title" tabIndex="0">
        Filter Results
      </h2>
      <div className="input-wrapper">
          <input
            type="text"
            placeholder="Search for specific places"
            aria-label="Search for specific places"
            onChange={e => filterPlaces(e.target.value)}
          />
      </div>
      <div className="filtered-places">
        <ul className="filtered-list" tabIndex="0">
          {
            showedPlaces.map(place =>
              <li
                key={place.id}
                className="result-item"
                tabIndex="0"
                onClick={() => onMarkerClick(place.id, 'open')}
              >
                {place.name}
              </li>
            )
          }
        </ul>
      </div>
    </aside>
  )
};

Filter.propTypes = {
  data: PropTypes.object.isRequired,
  onMarkerClick: PropTypes.func.isRequired,
  filterPlaces: PropTypes.func.isRequired
}

export default Filter;
