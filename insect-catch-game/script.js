const screens = document.querySelectorAll('.screen');
const choose_insect_btns = document.querySelectorAll('.choose-insect-btn');
const start_btn = document.getElementById('start-btn')
const game_container = document.getElementById('game-container')
const timeEl = document.getElementById('time')
const scoreEl = document.getElementById('score')
const message = document.getElementById('message')
const body = document.getElementById('body')

let seconds = 0
let score = 0
let selected_insect = {}

//画面の切り替え
start_btn.addEventListener('click', () => screens[0].classList.add('up'))

//insectを選択
choose_insect_btns.forEach(btn =>{
  btn.addEventListener('click', () => {
    const img = btn.querySelector('img')
    const src = img.getAttribute('src')
    const alt = img.getAttribute('alt')
    selected_insect = {src, alt}
    screens[1].classList.add('up')
    setTimeout(createInsect, 1000)
    startGame()
  })
})

function createInsect() {
  const insect = document.createElement('div')
  insect.classList.add('insect')
  const {x,y} = getRandomLocation()
  insect.style.top = `${y}px`
  insect.style.left = `${x}px`
  insect.innerHTML = `<img src="${selected_insect.src}" alt="${selected_insect.alt}" style="transform: rotate(${Math.random() * 360}deg) " />`

  insect.addEventListener('click', catchInsect)
  
  game_container.appendChild(insect)
 
}

function startGame() {
  setInterval(increaseTime, 1000)

}

function increaseTime() {
  let m = Math.floor(seconds/60)
  let s = seconds % 60

  m = m < 10 ? `0${m}` : m
  s = s < 10 ? `0${s}` : s
  timeEl.innerHTML = `Time: ${m}:${s}`
  seconds++

}

function getRandomLocation() {
  //コンテンツを表示する領域の幅
  const width = screen.width
  //コンテンツを表示する領域の高さ
  const height = window.innerHeight
  const x = Math.random() * (width ) 
  const y = Math.random() * (height -200) + 100
  // const x = Math.random() * (width ) 
  // const x = Math.random() * (width - 200) + 100
  // const y = Math.random() * (height) 
  
  return {x, y}
 
}

function catchInsect() {
  increaseScore()
  this.classList.add('caught')
  setTimeout(() => this.remove(), 2000)
  addInsects()
}

function addInsects() {
  setTimeout(createInsect, 1000)
  setTimeout(createInsect, 1500)

  if(score > 10) {
  setTimeout(createInsect, 500)
  }

  if(score > 20) {
    setTimeout(createInsect, 50)
    setTimeout(createInsect, 600)
    setTimeout(createInsect, 900)
    }

    if(score > 50) {
      setTimeout(createInsect, 50)
      setTimeout(createInsect, 600)
      setTimeout(createInsect, 700)
      setTimeout(createInsect, 800)
      setTimeout(createInsect, 900)
      }  
  var randnum = Math.floor( Math.random() * 100 );
  if(score == randnum || score == 30 || score == 80 || score == 120
    || score == 140) {
    console.log(score)
    setTimeout(clearBtn, 500)
  }
  
  
  // if(score > 20) {
  //   body.style.backgroundColor = "yellow";
  //   }
  //   if(score > 30) {
  //     body.style.backgroundColor = "black";
  //     }
}

function increaseScore() {
  score++
  // if(score > 19) {
  //   message.classList.add('visible')
  // }
  scoreEl.innerHTML = `Score: ${score}`
}

function clearBtn() {
  const killer = document.createElement('div')
  killer.classList.add('killer')
  const {x,y} = getRandomLocation()
  killer.style.top = `${y}px`
  killer.style.left = `${x}px`
  killer.innerHTML = `<img src="http://pngimg.com/uploads/moon/moon_PNG23.png" alt="alt" style="transform: rotate(${Math.random() * 360}deg)" />`

  killer.addEventListener('click', clearInsect)

  game_container.appendChild(killer)
}

function clearInsect() {
  game_container.innerHTML = "";

 createInsect()
}