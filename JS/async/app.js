async function myfunc() {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve('Hello'),1000);
  
});

const error = false;

if(!error) {
  const res = await promise;
  return res;

}else {
  await Promise.reject(new Error('something went wrong'))
}

}
myfunc()
 .then(res => console.log(res))
 .catch(err => console.log(err));


 async function getUsers() {

   const response = await fetch('https://jsonplaceholder.typicode.com/users');

   const data = await response.json();

   return data;
 }
 getUsers().then(users => console.log(users)) 
