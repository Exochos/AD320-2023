import {MongoClient} from 'mongodb';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();
const uri = process.env.MONGODB_URI;

// Define the database and collection
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
    // Connect to the MongoDB cluster
    await client.connect();
    console.log('Connected to database');

    // Make the appropriate DB calls
    const db = client.db(database);
    // Await the results of the find() call
    const results = await db.collection(collection)
        .find(filter, projection)
        .limit(1)
        .toArray();
    // Return the results
    return results;
   } catch (error) {
    console.error(error);
  } finally {
    // Close the connection to the MongoDB cluster
    await client.close();
  }
}

// Example query
const filter = {property_type: 'Apartment'};
// Call the function
const results = await findOne(collection, database, filter, projection);
// Print the results
console.log(results);
