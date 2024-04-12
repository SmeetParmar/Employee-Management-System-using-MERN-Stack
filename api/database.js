const { MongoClient } = require('mongodb');

let database;

async function connectToDB()
{
    const client = new MongoClient(process.env.DATABASE_URL);
    await client.connect();
    database = client.db('assignmentDB');
}

const getNextSequence = async (name) => {
    const result = await database.collection('counters').findOneAndUpdate(
      { _id: name },
      { $inc: { current: 1 } },
      { returnDocument: 'after' },
    );
    // console.log(result);
    return result.current;
  };

const getDatabase = () => database;

module.exports = { getNextSequence, connectToDB, getDatabase };