document.getElementById('seeData').addEventListener('click', appendData);
function appendData() {
  fetch('https://hardcore-mayer-7938e9.netlify.app/.netlify/functions/readAll')
    .then((response) => response.json())
    .then((data) => {
      let mainContainer = document.getElementById('myData');
      let titleBox = document.getElementById('title');
      for (let i = 0; i < data.data.length; i++) {
        let div = document.createElement('div');
        titleBox.innerHTML = "Indicators for Women's Health";
        div.innerHTML = data.data[i];
        mainContainer.appendChild(div);
      }
    })
    .catch(console.error);
}
