import { http } from "./http";
import { ui } from "./ui";

//get posts on page load
document.addEventListener('DOMContentLoaded', getPosts);

//listen for submit new post
document.querySelector('.post-submit').addEventListener('click', newPost);

//listen for delete post
document.querySelector('#posts').addEventListener('click', deletePost);

//listen for edit post state
document.querySelector('#posts').addEventListener('click', enableEditPost);

//listen for cancel button while editing post
document.querySelector('.card-form').addEventListener('click', cancelEdit);

function getPosts() {
  http.get('http://localhost:3000/posts')
    .then(data => ui.showPosts(data))
    .catch(error => console.log(error));
}

function newPost() {
  //get input data
  const title = document.getElementById('title').value;
  const body = document.getElementById('body').value;
  const id = document.getElementById('id').value;
  // add input data to object for post request
  const data = {
    "title": title,
    "body": body
  }

  //validate form has been filled out
  if (title === '' || body === '') {
    //show alert error if form not filled out completely
    ui.showAlert('Please fill out entire form', 'alert alert-danger')
  } else {
      //form is filled out so now check if new post or editing based on presense of id
      if (id === '') {
      //create new post
      http.post('http://localhost:3000/posts', data)
        .then(data => {
          getPosts();
          ui.clearFields();
          ui.showAlert('Post Added', 'alert alert-success');
        })
        .catch(error => console.log(error));
      } else {
        //update existing post because id has a value from enabling editing
        http.put(`http://localhost:3000/posts/${id}`, data)
        .then(data => {
          getPosts();
          ui.clearFields();
          ui.showAlert('Post Updated', 'alert alert-success');
          ui.changeFormState('add');
        })
        .catch(error => console.log(error));
      }
  }
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

function enableEditPost(e) {
  e.preventDefault();
  if (e.target.parentElement.classList.contains('edit')) {
    //get id of post to delete from html data attribute value
    const id = e.target.parentElement.dataset.id;
    //traverse dom to get both title and body to populate into input fields for editing
    const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
    const body = e.target.parentElement.previousElementSibling.textContent;
    
    const data = {
      id: id,
      title: title,
      body: body
    }

    //fill input fields with post data
    ui.fillFields(data);  
  }
}

function cancelEdit(e) {
  e.preventDefault();
  if (e.target.classList.contains('post-cancel')) {
    ui.changeFormState('cancel');
  }
}
