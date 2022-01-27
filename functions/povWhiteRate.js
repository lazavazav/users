require('dotenv').config();
const faunadb = require('faunadb');

const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET,
  domain: 'db.fauna.com',
});

exports.handler = (event, context, callback) => {
  console.log(`Function 'readAll' invoked`);
  return client
    .query(
      q.Map(
        q.Paginate(q.Documents(q.Collection('poverty')), {
          size: 12,
        }),
        q.Lambda('X', q.Select(['data', 'Rate_for_White'], q.Get(q.Var('X')))),
        q.Lambda('X', q.Select(['data', 'Rate_for_Black'], q.Get(q.Var('X'))))
      )
    )

    .then((response) => {
      console.log('success', response);
      return callback(null, {
        statusCode: 200,
        headers: {
          /* Required for CORS support to work */
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
        },
        body: JSON.stringify(response),
      });
    })
    .catch((error) => {
      console.log('error', error);
      return callback(null, {
        statusCode: 400,
        headers: {
          /* Required for CORS support to work */
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
        },
        body: JSON.stringify(error),
      });
    });
};