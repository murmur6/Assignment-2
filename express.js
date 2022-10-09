var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(bodyParser.json());

var fs = require('fs');


//global variable for tweet data
var tweetinfo = []


//load the input file
fs.readFile('favs.json', 'utf8', function readFileCallback(err,data ){
  if(err){
    req.log.info('cannot load a file:' + fileFolder + '/' + _file_name)
    throw err;
  }
  else{

    //TODO: store loaded data into a global variable for tweet data 
    tweetinfo = JSON.parse(data);
  }
});
 


//Get functions
//Shows user info
app.get('/tweets', function(req, res) {
  //TODO: send all users' IDs
  res.send({tweetinfo: tweetinfo}); //just sends tweetinfo
});

//Shows tweet info
app.get('/tweetinfo', function(req, res) {
  //TODO: send tweet info
  res.send({tweetinfo: tweetinfo}); //just sends tweetinfo
});

//Shows searched tweets
app.get('/searchinfo', function(req, res){
  //TODO: send searched tweets

res.send({tweetinfo: tweetinfo}); //just sends tweet info



});

//Post functions
//Posts created tweets
app.post('/tweetinfo', function(req, res) {
  //TODO: create a tweet.
   var tweetText = req.body.newText;
   var temp = tweetText.split(";");
   var temp1 = temp[0];
   var temp2 = temp[1];
   var time = new Date().toLocaleTimeString(); //this is so the new tweet will have a time
    tweetinfo.push({
        id: temp1,
        text: temp2,
        created_at: time,
        user: {id: "na"},
        user: {name: "na"},
        user: {screen_name: "na"}
    });

    res.send('Successfully published tweet!');

});

//Posts searched tweets
app.post('/searchinfo/:userID', function(req, res) {
  //TODO: search a tweet
  
  res.send({tweetinfo: tweetinfo}); //just sends tweetinfo
 
  res.send('Searched');

});

//Update
app.put('/tweets/:name', function(req, res) {
  //TODO: update tweets

  var givenName = req.params.name;
    var newName = req.body.newName;

    var found = false;

    tweetinfo.forEach(function(tweet, index) { //search for the maching name and replace it
        if (!found && tweet.user.name === givenName) {
            tweet.user.screen_name = newName;
        }
    });

    res.send('Succesfully updated user!');

});

//Delete 
app.delete('/tweetinfo/:id', function(req, res) {
  //TODO: delete a tweet

  var id = req.params.id;
  var delId = req.body.id;

    var found = false;
//search for the matching id and delete the matching part of the array
    tweetinfo.forEach(function(tweet, index) { 
        if (!found && tweet.id === Number(id)) {
            tweetinfo.splice(index, 1);
        }
    });

    res.send('Successfully deleted thing!');

});


app.listen(PORT, function() {
  console.log('Server listening on ' + PORT);
});