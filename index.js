const fetch = require('node-fetch');
// const readAll = () => {
//   return (
//     fetch('http://localhost:8888/api/readAll')
//       .then((response) => {
//         console.log(response.json());
//         return response.json();
//       })
//       // .then(function (response) {
//       //   appendData(response);
//       // })
//       .catch(function (err) {
//         console.log(err);
//       })
//   );
// };
// readAll();
// fetch('http://localhost:8888/api/readAll')
//   .then((response) => response.json())
//   .then((json) => console.log({ json }));
document.getElementById('seeData').addEventListener('click', appendData);
function appendData() {
  fetch('/.netlify/functions/readAll')
    .then((response) => response.json())
    .then((data) => {
      var mainContainer = document.getElementById('myData');
      for (var i = 0; i < data.data.length; i++) {
        var div = document.createElement('div');
        div.innerHTML = 'Indicators: ' + data.data[i];
        mainContainer.appendChild(div);
      }
    })
    .catch(console.error);
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
