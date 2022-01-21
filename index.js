import fetch from 'node-fetch';

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
