import { http } from './http';
import { ui } from './ui';

// Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);

//Listen for add post
document.querySelector('.post-submit').addEventListener('click', submitPost);

//Listen for delete
document.querySelector('#posts').addEventListener('click',deletePost);

//Listen for edit
document.querySelector('#posts').addEventListener('click',enableEdit);


//Get posts
function getPosts() {
  http.get('http://localhost:3000/posts')
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err));
}

//Submit post
function submitPost() {
 const title = document.querySelector('#title').value;
 const body = document.querySelector('#body').value;

 const data = {
   title,
   body
 }

 //create Post
 http.post('http://localhost:3000/posts',data)
  .then(data => {
    ui.showAlert('Post added','alert alert-success');
    ui.clearFields();
    getPosts();
  })
  .catch(err => console.log(err));
}

  //Delete
  function deletePost(e) {
  e.preventDefault();
  if(e.target.parentElement.classList.contains('delete')) {
   const id = e.target.parentElement.dataset.id;
   if(confirm('Are you sure?')){
     http.delete(`http://localhost:3000/posts/${id}`)
      .then(data => {
        ui.showAlert('Post removed', 'alert alert-success');
        getPosts();
      })
      .catch(err => console.log(err));
   }
  }
 
  }

  //enable edit state
  function enableEdit(e){
    if(e.target.parentElement.classList.contains('edit')) {
      const id = e.target.parentElement.dataset.id;
      const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
      const body = e.target.parentElement.previousElementSibling.textContent;

      console.log(e.target.parentElement.previousElementSibling.textContent);

      const data = {
        id,
        title,
        body
      }

      //Fill form with current post
      ui.fillForm(data);
    }
    e.preventDefault();
  }