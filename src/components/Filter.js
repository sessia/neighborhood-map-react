import React from 'react';
import PropTypes from 'prop-types';

const Filter = ({ data, filterPlaces, onMarkerClick }) => {
  const { places, showedPlaces } = data;

  return (
    <aside className="filter">
      <a id="menu" tabIndex = {0} role="button"
          aria-label="Menu that shows list of places you can filter" className="header__menu" >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M2 6h20v3H2zm0 5h20v3H2zm0 5h20v3H2z"></path>
          </svg>
    	</a>
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
