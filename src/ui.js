class UI {
  constructor() {
    this.post = document.querySelector('#posts');
    this.titleInput = document.querySelector('#title');
    this.bodyInput = document.querySelector('#body');
    this.idInput = document.querySelector('#id');
    this.postSubmit = document.querySelector('.post-submit');
    this.formState = 'add';
  }

  showPosts(posts) {
    let output = '';
    posts.forEach(post => {
      output += `
        <div class='card mb-3'>
          <div class='card-body'>
            <h4 class='card-title'>${post.title}</h1>
            <p class='card-text'>${post.body}</p>
            <a href='#' class='edit card-link' data-id='${post.id}'>
              <i class="fas fa-pencil-alt"></i>
            </a>
            <a href='#' class='delete card-link' data-id='${post.id}'>
              <i class="fas fa-trash-alt"></i>
            </a>
          </div>
        </div>
      `
    })
    this.post.innerHTML = output;
  }
  showAlert(message, className) {
    this.clearAlert();
    //create alert div
    const alertDiv = document.createElement('div');
    alertDiv.className = className;
    alertDiv.appendChild(document.createTextNode(message));
    //add to dom
    const containerDiv = document.querySelector('.posts-container');
    const postsDiv = document.querySelector('#posts');
    containerDiv.insertBefore(alertDiv, postsDiv);

    //timeout to remove alert
    setTimeout(this.clearAlert, 3000);
  }
  clearAlert() {
    const alertDiv = document.querySelector('.alert');
    if (alertDiv) {
      alertDiv.remove();
    }
  }

  clearFields() {
    this.titleInput.value = '';
    this.bodyInput.value = '';
  }

  clearIdInput() {
    this.idInput.value = '';
  }

  fillFields(data) {
    this.titleInput.value = data.title;
    this.bodyInput.value = data.body;
    this.idInput.value = data.id;

    this.changeFormState('edit');
  }

  changeFormState(type) {
    if (type === 'edit') {
      //this is for the edit form state

      this.postSubmit.textContent = 'Update';
      this.postSubmit.className = 'post-submit btn btn-warning btn-block'

      //create cancel button
      const cancelButton = document.createElement('button');
      cancelButton.className = 'post-cancel btn btn-light btn-block mt-1'
      cancelButton.appendChild(document.createTextNode('Cancel'));

      //add cancel button to dom
      //get parent and sibling to insert before
      const cardForm = document.querySelector('.card-form');
      const formEndSpan = document.querySelector('.form-end');
      cardForm.insertBefore(cancelButton, formEndSpan);

    } else {
      //this is for cancelling the edit form state

      //change button back to normal
      this.postSubmit.textContent = 'Post It';
      this.postSubmit.className = 'post-submit btn btn-primary btn-block'
      //remove cancel button
      document.querySelector('.post-cancel').remove();
      //clear id from hidden field
      this.clearIdInput();
      //clear text from input fields
      this.clearFields();
    }
  }
}

export const ui = new UI();