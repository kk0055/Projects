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

    posts.forEach((post) => {
      output += `
        <div class="card mb-3">
          <div class="card-body">
            <h4 class="card-title">${post.title}</h4>
            <p class="card-text">${post.body}</p>
            <a href="#" class="edit card-link" data-id="${post.id}">
              <i class="fa fa-pencil"></i>
            </a>

            <a href="#" class="delete card-link" data-id="${post.id}">
            <i class="fa fa-remove"></i>
          </a>
          </div>
        </div>
      `;
    });

    this.post.innerHTML = output;
  }
  showAlert(message, className) {
    this.clearAlert()

    const div = document.createElement('div')
    div.className = className;
    div.appendChild(document.createTextNode(message))
    const container = document.querySelector('.postsContainer')
    const posts = document.querySelector('#posts')
    container.insertBefore(div, posts)

    setTimeout(() => {
      this.clearAlert()
    }, 2000)
  }
  clearAlert() {
    const currentAlert = document.querySelector('.alert')

    if (currentAlert) {
      currentAlert.remove()
    }
  }
  clearFields() {
    this.titleInput.value = ''
    this.bodyInput.value = ''
  }
  changeFormState(type) {
   if(type === 'edit') {
    this.postSubmit.textContent = 'update Post'
    this.postSubmit.className = 'post-submit btn btn-warning btn-block'

    //create cxl button
    const button = document.createElement('button');
    button.className = 'post-cancel btn btn-light btn-block'
    button.appendChild(document.createTextNode('cancel Edit'))

    //Get parent
    const cardForm = document.querySelector('.card-form');
    //Get element to insert before
    const formEnd = document.querySelector('.form-end');
    //Insert
    cardForm.insertBefore(button,formEnd)
   } else {
     
   }
  }
  fillForm(data) {
    this.titleInput.value = data.title
    this.bodyInput.value = data.body
    this.idInput.value = data.id

    this.changeFormState('edit')
  }
}

export const ui = new UI();