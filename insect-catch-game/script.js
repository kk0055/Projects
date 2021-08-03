const screens = document.querySelectorAll('.screen');
const choose_insect_btns = document.querySelectorAll('.choose-insect-btn');
const start_btn = document.getElementById('start-btn')
const game_container = document.getElementById('game-container')
const timeEl = document.getElementById('time')
const scoreEl = document.getElementById('score')
const message = document.getElementById('message')

let seconds = 0
let score = 0
let selected_insect = {}

//画面の切り替え
start_btn.addEventListener('click', () => screens[0].classList.add('up'))

//insectを選択
choose_insect_btns.forEach(btn =>{
  btn.addEventListener('click', () => {
    const img = btn.querySelector('img')
    const src = img.getAttribute('alt')
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
}