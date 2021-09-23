class UI {
  constructor() {
    this.post = document.querySelector('#posts');
    this.titleInput = document.querySelector('#title');
    this.bodyInput = document.querySelector('#body');
    this.idInput = document.querySelector('#id');
    this.postSubmit = document.querySelector('.post-submit');
    this.forState = 'add';
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
}

export const ui = new UI();