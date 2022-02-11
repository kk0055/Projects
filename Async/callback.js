const posts = [
  {title: "Post one", body: "This is post one"},
  {title: "Post two", body: "This is post two"}
]

function getPosts() {
  setTimeout(() =>{
   let output = '';
   posts.forEach((post) => {
     output += `<li>${post}</li>`
   })
  },1000)
}