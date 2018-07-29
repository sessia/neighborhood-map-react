const api = 'https://api.foursquare.com/v2/venues/';

export const getLocations = (id) =>
  fetch(`${api}${id}?client_id=NTXHXQNFESZYHKFVBLRMQPIX44KVL4M4BQIT4FE0HDIRKKIP&client_secret=K5PQNRF3YKASL04SJQSHWOARIODZONWVKNBT4LCDLXQJ5IWG&v=20180729&locale=en`)
    .then(res => res.json())
    .then(data => data.response.venue)
    .catch(err => console.log('Couldn\'t retrieve venue details with ', err))
