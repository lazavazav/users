require('dotenv').config();
const faunadb = require('faunadb');

console.log('Creating FaunaDB database...');

// const createCollections = (key) => {
//   const q = faunadb.query;

//   const client = new faunadb.Client({
//     secret: key,
//     domain: 'db.fauna.com',
//   });

//   client
//     .query(q.CreateCollection({ name: 'newHealth' }))
//     .then((ret) => console.log('Success: %s', ret))
//     .catch((err) => console.error('Error: %s', err));
// };

const createIndexes = (key) => {
  const q = faunadb.query;

  const client = new faunadb.Client({
    secret: key,
    domain: 'db.fauna.com',
  });
  // Health by Indicator Index
  client
    .query(
      q.CreateIndex({
        name: 'health_by_indicator',
        permissions: { read: 'public' },
        source: q.Collection('newHealth'),
        terms: [{ field: ['data', 'Indicator Name'] }],
        unique: true,
      })
    )
    .then((ret) => console.log('Success: %s', ret))
    .catch((err) => console.error('Error: %s', err));
};
if (!process.env.FAUNADB_SECRET) {
  console.error('FaunaDB Secret Key not found!');
} else {
  // createCollections(process.env.FAUNADB_SECRET);
  createIndexes(process.env.FAUNADB_SECRET);
}
