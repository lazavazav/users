require('dotenv').config();
const faunadb = require('faunadb');

console.log('Creating FaunaDB database...');

const createCollections = (key) => {
  const q = faunadb.query;

  const client = new faunadb.Client({
    secret: key,
    domain: 'db.fauna.com',
  });
  // Users Collection
  client
    .query(q.CreateCollection({ name: 'users' }))
    .then((ret) => console.log('Success: %s', ret))
    .catch((err) => console.error('Error: %s', err));

  // CatBreeds Collection
  client
    .query(q.CreateCollection({ name: 'cat_breeds' }))
    .then((ret) => console.log('Success: %s', ret))
    .catch((err) => console.error('Error: %s', err));
};

const createIndexes = (key) => {
  const q = faunadb.query;

  const client = new faunadb.Client({
    secret: key,
    domain: 'db.fauna.com',
  });
  // Users by Email Index
  client
    .query(
      q.CreateIndex({
        name: 'users_by_email',
        permissions: { read: 'public' },
        source: q.Collection('users'),
        terms: [{ field: ['data', 'email'] }],
        unique: true,
      })
    )
    .then((ret) => console.log('Success: %s', ret))
    .catch((err) => console.error('Error: %s', err));

  // Cat Breeds by Users Index
  client
    .query(
      q.CreateIndex({
        name: 'cats_by_users',
        source: [q.Collection('cat_breeds')],
        terms: [{ field: ['data', 'userRef'] }],
      })
    )
    .then((ret) => console.log('Success: %s', ret))
    .catch((err) => console.error('Error: %s', err));
};

const createRoles = (key) => {
  const q = faunadb.query;

  const client = new faunadb.Client({
    secret: key,
    domain: 'db.fauna.com',
  });
  client
    .query(
      q.CreateRole({
        name: 'cat_whisperers',
        membership: [
          {
            resource: q.Collection('users'),
          },
        ],
        privileges: [
          {
            resource: q.Collection('cat_breeds'),
            actions: {
              read: true,
              write: true,
              create: true,
              delete: true,
              history_read: false,
              history_write: false,
              unrestricted_read: false,
            },
          },
          {
            resource: q.Index("'cats_by_users'"),
            actions: {
              unrestricted_read: false,
              read: true,
            },
          },
        ],
      })
    )
    .then((ret) => console.log('Success: %s', ret))
    .catch((err) => console.error('Error: %s', err));
};

if (!process.env.FAUNADB_SECRET) {
  console.error('FaunaDB Secret Key not found!');
} else {
  createCollections(process.env.FAUNADB_SECRET);
  createIndexes(process.env.FAUNADB_SECRET);
  createRoles(process.env.FAUNADB_SECRET);
}
