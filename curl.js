import {MongoClient} from 'mongodb';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();
const uri = process.env.MONGODB_URI;
const database = process.env.MONGODB_DB;
const collection = process.env.MONGODB_COLLECTION;

// Define the query filter
const projection = {
  _id: 0,
  name: 1,
  summary: 1,
  property_type: 1,
  cancellation_policy: 1,
};


/**
 * Get data from sample_airbnb database
 * replicating findOne() from MongoDB API
 * @param {string} collection
 * @param {database} database
 * @param {object} filter
 * @param {object} projection
 */
async function findOne(collection, database, filter, projection) {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log('Connected to database');
    const db = client.db(database);
    const results = await db.collection(collection)
        .find(filter, projection)
        .limit(1)
        .toArray();
    return results;
  } finally {
    await client.close();
  }
}

// Example query
const filter = {property_type: 'Apartment'};
// Call the function
const results = await findOne(collection, database, filter, projection);
// Print the results
console.log(results);
