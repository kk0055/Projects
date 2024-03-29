const posts = [{
    title: "Post one",
    body: "This is post one"
  },
  {
    title: "Post two",
    body: "This is post two"
  }
]

function getPosts() {
  setTimeout(() => {
    let output = '';
    posts.forEach((post) => {
      output += `<li>${post.title}</li>`
    });
    document.body.innerHTML = output;

  }, 1000)
}

function createPost(post) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      posts.push(post);

      const error = false;

      if (!error) {
        resolve()
      } else {
        reject('Error');
      }
    }, 2000)
  });

}

// createPost({
//     title: "Post two",
//     body: "This is post two"
//   })
//   .then(getPosts)
//   .catch(error => console.log(error))

// async function init() {
//   await createPost(  {
//     title: "Post two",
//     body: "This is post two"
//   });

//   getPosts();
// }

// init()

async function fetchUsers(){
  const res = await fetch('https://jsonplaceholder.typicode.com/users/')

  const data  = await res.json();
  console.log(data);
}

fetchUsers()
// const promise1 = Promise.resolve('Hello World');
// const promise2 = 10;
// const promise3 = new Promise((resolve, reject) => setTimeout(resolve, 2000, "goode bye"));
// const promise4 = fetch('https://jsonplaceholder.typicode.com/users/').then(res => res.json())

// Promise.all([promise1, promise2, promise3, promise4]).then((val) => console.log(val));