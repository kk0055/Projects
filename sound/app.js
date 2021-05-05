var btn = document.querySelector('.btn');
var speech = document.querySelector('#speech');
var text = speech.textContent;
//var text = speech.getAttribute('alt');
console.log(text);

btn.addEventListener( 'click', function() {
var msg = new SpeechSynthesisUtterance();
msg.text = text; 
msg.lang = 'ja-JP';
window.speechSynthesis.speak(msg);    }, false );