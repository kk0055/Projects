const result = document.getElementById('result')
const filter = document.getElementById('filter')

const listItems = []


getData()


filter.addEventListener('input', (e) => filterData(e.target.value))

async function getData() {
  const res = await fetch('https://randomuser.me/api?results=50')
 
  // {results} は data.resultsと同じ 
  const {results} = await res.json()

  // const data = await res.json()
  // const results =  data.results

  console.log(results)
 
  //Clear results
 result.innerHTML = ''
  
//resultsの結果をforeachでuserとしてまわす
 results.forEach(user => {
   const li = document.createElement('li')

    listItems.push(li)
     li.innerHTML = `
            <img src="${user.picture.large}" alt="${user.name.first}">
            <div class="user-info">
                <h4>${user.name.first} ${user.name.last}</h4>
                <p>${user.location.city}, ${user.location.country}</p>
                <p>${user.email}</p>
            </div>
        `

        result.appendChild(li)
 })

}
function filterData(search) {
   listItems.forEach(item => {
     if(item.innerText.toLowerCase().includes(search.toLowerCase())) {
           item.classList.remove('hide')
     }else {
         item.classList.add('hide')
     }
   })
}


