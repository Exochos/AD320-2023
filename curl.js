import fetch from 'node-fetch';
import * as dotenv from 'dotenv';

dotenv.config();
const url = 'https://data.mongodb-api.com/app/data-vucnh/endpoint/data/v1/action/find';
let data = [];

const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Request-Headers': '*',
    'api-key': process.env.API_KEY,
  },
  body: JSON.stringify({
    collection: 'listingsAndReviews',
    database: 'sample_airbnb',
    dataSource: 'Cluster0',
    filter: {property_type: 'Apartment'},
    projection: {
      _id: 0,
      name: 1,
      summary: 1,
      property_type: 1,
      cancellation_policy: 1,
    },
  },
  ),
};

/**
 * Get data from sample_airbnb database
 * @return {object} data
 * @return {string} data.name
 * @return {string} data.summary
 * @return {string} data.property_type
 * @return {string} data.cancellation_policy
 */
function getData() {
  fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        data = json;
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  return data;
}

getData();
