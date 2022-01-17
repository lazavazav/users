const faunadb = require('faunadb');

const q = faunadb.query;

module.exports.handler = async (event, context, callback) => {
  const payload = {
    user_id: '285249298598199809',
    name: 'mr snugglepants',
    image: 'https://example.com/cat_1.jpg',
    breed: 'maine coon',
  };
  let authorization =
    'Bearer fnED_83xz1ACAAPy2UP8gAYBHFYA7Xw0l-0EDv_oWF4fj28gX9I';
  authorization = authorization.split('');
  const token = authorization[1];

  const client = new faunadb.Client({
    secret: token,
  });
  try {
    const response = await client.query(
      q.Create(q.Collection('addresses'), {
        data: {
          name: payload.name,
          image: payload.image,
          breed: payload.breed,
          userRef: q.Ref(q.Collection('users'), payload.user_id),
        },
      })
    );

    callback(null, {
      statusCode: 200,
      headers: {
        /* Required for CORS support to work */
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: JSON.stringify(response),
    });
  } catch (err) {
    console.error(err);

    callback(null, {
      statusCode: 400,
      headers: {
        /* Required for CORS support to work */
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: JSON.stringify({ error: err }),
    });
  }
};
