unirest.get("https://wordsapiv1.p.mashape.com/words/soliloquy")
  .header("X-RapidAPI-Key", "b982c2f91dmsh4f0d51d46c7722fp13fc13jsn83554faa35fe")
  .end(function (result) {
    console.log(result.status, result.headers, result.body);
  });