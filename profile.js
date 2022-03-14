// Let's find these DOM elements!
const infoPre = document.querySelector('#user');
const infoName = document.querySelector('#nameDiv');
const infoEmail = document.querySelector('#emailDiv');

// format_stringify is a function that takes in an object and returns formatted JSON
const format_stringify = (data) => JSON.stringify(data, null, 2);
// showCurrentInfo updates the UI to show the current user data passed in to it
const showCurrentInfo = (user) => {
  const str = format_stringify(user);
  console.log(str);
  infoName.innerHTML = 'Name: ' + user.user_metadata.full_name;
  infoEmail.innerHTML = 'Email: ' + user.email;
};
// open function opens the netlify-identity-widget signup/sign-in modal
const open = () => netlifyIdentity.open();
// save function takes the value of the textarea and saves it in the user_metadata for the logged in user
const save = async () => {
  // const user_metadata = {
  //   data: {
  //     full_name: textArea.value,
  //   },
  // };
  const user = await netlifyIdentity.gotrue.currentUser().update(user_metadata);

  //   showCurrentInfo(user);
  //   // textArea.value = '\n Saved!';
  //   textArea.value = format_stringify(user.user_metadata);
};

// Adding an event listener on the netlify identity widget to show the current users data
netlifyIdentity.on('login', (user) => {
  showCurrentInfo(user);
  // if (user.user_metadata.full_name) {
  //   textArea.value = format_stringify(
  //     user.user_metadata.full_name
  //   ).replace(/"/g, '');
  // }
  // testing sending jwt in auth header
  // Example POST method implementation:
  async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + user.token.access_token,
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return await response.json(); // parses JSON response into native JavaScript objects
  }
});

// adding some event listeners.
document.querySelector('#open').addEventListener('click', open);
