// const token = '92fa20e425bd965d452b44e006203dc06fb8407b'
const baseAPI = 'https://api.github.com'
const gistForm = document.querySelector('form#createGists')
const gists = document.getElementById('gists')

// form.submit(function(e) {
  // e.preventDefault()
  // const file_name = document.getElementById('file_name')
  // const content = document.getElementById('content')
  // const description = document.getElementById('description')
  // const token = document.getElementById('token')
  // createGists(file_name, content, description, token)
// })
gistForm.addEventListener('submit', function(e){
  e.preventDefault()
  const file_name = document.getElementById('file_name').value
  const content = document.getElementById('contents').value
  const description = document.getElementById('description').value
  const token = document.getElementById('token').value
  createGist(file_name, content, description, token)
})


//define functions here
function createGist(file_name, content, description, token){
  console.log(token)
  const data = {
    "description": `${description}`,
    "public": true,
    "files": {[file_name]: {"content": `${content}`}}
  }
  fetch(`${baseAPI}/gists`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `token ${token}`
    },
    body: JSON.stringify(data)
  }).then(resp => resp.json()).then(json => {
    myGists(json.owner.login, token)
  })
};

function myGists(username, token){
  fetch(`${baseAPI}/users/${username}/gists`,{
    method: 'get',
    headers: {
      Authorization: `token ${token}`
    }
  }).then(resp => resp.json()).then(json => {
    const list = `<h4>User: ${username}</h4>`+ '<ul>' + json.map(gist => {
      debugger
      return `<li>${gist.description} - <a href='${gist.html_url}'>link</a></li>`
    }).join('') + '</ul>'
    gists.innerHTML = list
  })
};
