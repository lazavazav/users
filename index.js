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
        document.getElementById('seeData').disabled = true;
      }
    })
    .catch(console.error);
}

function getOption() {
  selectElement = document.querySelector('#selectOptions');
  output = selectElement.value;
  console.log(output);
  addTable();
}

// function addTable() {
//   let myTableDiv = document.getElementById('myTable');

//   let table = document.createElement('TABLE');
//   table.border = '1';

//   let tableBody = document.createElement('TBODY');
//   table.appendChild(tableBody);

//   let tableHead = document.createElement('THEAD');
//   table.appendChild(tableHead);

//   let tr1 = document.createElement('TR');
//   tr1.innerHTML = 'Indicator Name'
//   tableHead.appendChild(tr1);

//   let tr2 = document.createElement('TR');
//   tr2.innerHTML = 'Rate for Black';
//   tableHead.appendChild(tr2);

//   let tr3 = document.createElement('TR');
//   tr3.innerHTML = 'Rate for White';
//   tableHead.appendChild(tr3);

//     for (var j = 0; j < 4; j++) {
//       var td = document.createElement('TD');
//       td.width = '75';
//       td.appendChild(document.createTextNode('Cell ' + j));
//       tr.appendChild(td);
//     }

//   myTableDiv.appendChild(table);
// }
function addTable() {
  let myTableDiv = document.getElementById('myTable');

  let table = document.createElement('TABLE');
  table.border = '1';
  table.className = 'table table-striped';
  let tableHead = document.createElement('THEAD');
  table.appendChild(tableHead);
  let tableBody = document.createElement('TBODY');
  table.appendChild(tableBody);

  let heading1 = document.createElement('TH');
  heading1.innerHTML = 'Indicator Name';
  tableHead.appendChild(heading1);

  let heading2 = document.createElement('TH');
  heading2.innerHTML = 'Rate for Black';
  tableHead.appendChild(heading2);

  let heading3 = document.createElement('TH');
  heading3.innerHTML = 'Rate for White';
  tableHead.appendChild(heading3);

  fetch('https://hardcore-mayer-7938e9.netlify.app/.netlify/functions/health')
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.data.length; i++) {
        let row = document.createElement('div');
        row.innerHTML = data.data[i];
        tableBody.appendChild(row);
      }
    })
    .catch(console.error);

  myTableDiv.appendChild(table);
}
