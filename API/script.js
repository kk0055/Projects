// var unirest = require('unirest');

unirest.get("https://wordsapiv1.p.mashape.com/words/soliloquy")
  .header("X-RapidAPI-Key", "b982c2f91dmsh4f0d51d46c7722fp13fc13jsn83554faa35fe")
  .end(function (result) {
    console.log(result.status, result.headers, result.body);
  });

//   var request = require('request');

// var options = {
//   method: 'get',
//   url: 'https://wordsapiv1.p.mashape.com/words/soliloquy',
//   headers: {
//     'x-rapidapi-key': 'b982c2f91dmsh4f0d51d46c7722fp13fc13jsn83554faa35fe'
//   }
// };

// request(options, function (error, response, body) {
//     if (error) throw new Error(error);

//     console.log(body);
// });