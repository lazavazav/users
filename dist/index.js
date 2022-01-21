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

function appendData() {
  fetch('http://localhost:8888/api/readAll')
    .then((response) => response.json())
    .then((data) => {
      console.log(data.data[2]);

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
