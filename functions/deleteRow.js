/* code from functions/todos-delete.js */
import faunadb from 'faunadb';

const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET,
});

exports.handler = (event, context, callback) => {
  const id = event.id;
  console.log(`Function 'deleteRow' invoked. delete id: ${id}`);
  return client
    .query(q.Delete(q.Ref(`newHealth/health_by_indicator/${id}`)))
    .then((response) => {
      console.log('success', response);
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify(response),
      });
    })
    .catch((error) => {
      console.log('error', error);
      return callback(null, {
        statusCode: 400,
        body: JSON.stringify(error),
      });
    });
};
