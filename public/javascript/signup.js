async function signupHandler(event) {
  event.preventDefault();

  const username = document.querySelector('.username').value;
  const password = document.querySelector('.password').value;
  const email = document.querySelector('.email').value;
  
  const response = await fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify({
      username,
      password,
      email
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
}


document.querySelector('.signup-form').addEventListener('submit', signupHandler);