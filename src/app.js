import { http } from "./http";
import { ui } from "./ui";

//get posts on page load
document.addEventListener('DOMContentLoaded', getPosts);

//listen for submit new post
document.querySelector('.post-submit').addEventListener('click', newPost);

//listen for delete post
document.querySelector('#posts').addEventListener('click', deletePost);

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

function deletePost(e) {
  e.preventDefault();
  if (e.target.parentElement.classList.contains('delete')) {
    //get id of post to delete from html data attribute value
    const id = e.target.parentElement.dataset.id;
    http.delete(`http://localhost:3000/posts/${id}`)
      .then(data => {
        getPosts();
        ui.showAlert('Post Deleted', 'alert alert-success');
      })
      .catch(error => console.log(error));
  }
}