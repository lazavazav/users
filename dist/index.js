const readAll = () => {
  return fetch('/.netlify/functions/readAll')
    .then((response) => {
      console.log(response);
      return response;
    })
    .then(function (data) {
      appendData(data);
    })
    .catch(function (err) {
      console.log(err);
    });
};
readAll();

function appendData(data) {
  var mainContainer = document.getElementById('myData');
  for (var i = 0; i < data.length; i++) {
    var div = document.createElement('div');
    div.innerHTML = 'Indicators: ' + data[i];
    mainContainer.appendChild(div);
  }
}

// const deleteRow = (Id) => {
//   return fetch(`/.netlify/functions/deleteRow/${Id}`, {
//     method: 'POST',
//   }).then((response) => {
//     return response.json();
//   });
// };

// const batchDelete = (Ids) => {
//   return fetch(`/.netlify/functions/delete-batch`, {
//     body: JSON.stringify({
//       ids: Ids,
//     }),
//     method: 'POST',
//   }).then((response) => {
//     return response.json();
//   });
// };
