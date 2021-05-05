function easyHTTP() {
  this.http = new XMLHttpRequest();
}

easyHTTP.prototype.get = function(url) {
  this.http.open('GET',url,true);

  let self = this;
  this.http.onload = () => {
    if(self.http.status === 200) {
      console.log(self.http.responseText)
    }
  }
  this.http.send()
}