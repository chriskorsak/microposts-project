import { http } from "./http";
import { ui } from "./ui";

//get posts on page load
document.addEventListener('DOMContentLoaded', getPosts);

//submit post event listener
document.querySelector('.post-submit').addEventListener('click', newPost);

function getPosts() {
  http.get('http://localhost:3000/posts')
    .then(data => ui.showPosts(data))
    .catch(error => console.log(error));
}

function newPost() {
  //get input data
  const title = document.getElementById('title').value;
  const body = document.getElementById('body').value;
  // add input data to object for post request
  const data = {
    "title": title,
    "body": body
  }
  http.post('http://localhost:3000/posts', data)
    .then(data => {
      getPosts();
      ui.clearFields();
      ui.showAlert('Post Added', 'alert alert-success');
    })
    .catch(error => console.log(error));
}