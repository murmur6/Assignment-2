
$(function() {

  function test_print(){

         console.log(“test code”)

}

  
   //Get 
   $('#get-button').on('click', function() {
        //TODO: get all users' IDs & display it
        $.ajax({
          url: '/tweets',
          contentType: 'application/json',
          success: function(response) {
            var tbodyEl = $('#namebody');

            tbodyEl.html('');

            response.tweetinfo.forEach(function(tweet)
            {
              tbodyEl.append('\
                <tr>\
                    <td <class="id">' + tweet.user.id + '</td>\
                    <td><input type="text"class="Screenname" value="' + tweet.user.screen_name + '"></td>\
                    <td <class="id">' + tweet.user.name + '</td>\
                <tr>\
                ');
            });
          }
        });
    });


    //Get tweets
    $('#get-tweets-button').on('click', function(){
        //TODO: get tweet info and display it
        $.ajax({
          url: '/tweetinfo',
          contentType: 'function/json',
          success: function(response) {
            console.log(response);

             console.log(response);

            var tbodyEl = $('#tweetbody');

            tbodyEl.html('');

            response.tweetinfo.forEach(function(tweety)
            {
              tbodyEl.append('\
                <tr>\
                    <td <class="id">' + tweety.id + '</td>\
                    <td <class="id">' + tweety.text + '</td>\
                    <td <class="id">' + tweety.created_at + '</td>\
                <tr>\
                ');
            });


          }

        });
    });

    //Get searched tweets
    var lastSearch; //global variable to store the last searched tweet id
    $('#get-searched-tweets').on('click', function() {
        //TODO: get a searched tweet(s) & display it
        $.ajax({
          url: '/searchinfo',
          contentType: 'function/json',
          success: function(response) {
           

            var searchbodyEl = $('#searchbody');
            
            searchbodyEl.html('');
            
            response.tweetinfo.forEach(function(tweety)
            {
              
              if(tweety.id === Number(lastSearch)){

                searchbodyEl.append('\
                <tr>\
                    <td <class="id">' + 'lastSearch:   ' + '</td>\
                    <td <class="id">' + tweety.id + '</td>\
                    <td <class="id">' + tweety.text + '</td>\
                    <td <class="id">' + tweety.created_at + '</td>\
                <tr>\
                ');

              }

            });


          }

        });
    });


  //CREATE
  $('#create-form').on('submit', function(event){
        event.preventDefault();

        var createInput = $('#create-input');

        //TODO: creat a tweet

        $.ajax({
            url: '/tweetinfo',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ newText: createInput.val()}),
            success: function(response) {
                console.log(response);
                createInput.val('');
                $('#get-button').click();
            }
        });

  });

    //Create searched tweets
  $('#search-form').on('submit', function(event){
    event.preventDefault();
    var userID = $('#search-input');
    
    //TODO: search a tweet and display it.
    var inputString = userID.val();
    lastSearch = inputString;
    $.ajax({
          url: '/searchinfo/' + inputString,
          method: 'POST',
          contentType: 'function/json',
          data: JSON.stringify({ userID: userID}),
          success: function(response) {
            console.log(response);


            var searchbodyEl = $('#searchbody');
            
            searchbodyEl.html('');
            
            response.tweetinfo.forEach(function(tweety)
            {
              
              if(tweety.id === Number(inputString)){

                searchbodyEl.append('\
                <tr>\
                    <td <class="id">' + tweety.id + '</td>\
                    <td <class="id">' + tweety.text + '</td>\
                    <td <class="id">' + tweety.created_at + '</td>\
                <tr>\
                ');

              }

            });


          }

        });


  });

  //UPDATE/PUT
  $("#update-user").on('submit', function(event){
      event.preventDefault();
    var updateInput = $('#update-input');
    var inputString = updateInput.val();

    const parsedStrings = inputString.split(';');

    var name = parsedStrings[0];
    var newName = parsedStrings[1];
    
    //TODO: update a tweet

    $.ajax({
            url: '/tweets/' + name,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({ newName: newName }),
            success: function(response) {
                console.log(response);
                $('#update-user').click();
            }
        });


  });


  //DELETE
  $("#delete-form").on('submit', function() {
    var id = $('#delete-input')
    event.preventDefault();

    //TODO: delete a tweet
    var niceID = id.val();
    $.ajax({
            url: '/tweetinfo/' + niceID,
            method: 'DELETE',
            contentType: 'application/json',
            data: JSON.stringify({ id: id}),
            success: function(response) {
                console.log(response);
                $('#get-button').click();
            }
        });

  });


});


                    
   