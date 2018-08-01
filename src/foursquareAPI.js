const api = 'https://api.foursquare.com/v2/venues/';

export const getLocations = (id) =>
  fetch(`${api}${id}?client_id=NTXHXQNFESZYHKFVBLRMQPIX44KVL4M4BQIT4FE0HDIRKKIP&client_secret=K5PQNRF3YKASL04SJQSHWOARIODZONWVKNBT4LCDLXQJ5IWG&v=20180729&locale=en`)
    .then(res => {
			if(res.ok){
				return res.json();
			} else {
				throw new Error("Ops, information not available, there was an error while retrieving them from Foursquare");
			}})
    .then(data => data.response.venue)
