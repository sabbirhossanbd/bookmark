//listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);
 // save bookmark
function saveBookmark(e){
  
     var siteName = document.getElementById('siteName').value;
     var siteUrl = document.getElementById('siteUrl').value;

      if(!validateForm(siteName, siteUrl)){
      	return false;
      }

      var bookmark = {
      	 name : siteName,
      	 url  : siteUrl
      }
      /*
     // local storage test
     localStorage.setItem('test', 'Hello World');
     console.log(localStorage.getItem('test'));
     localStorage.removeItem('test');
     console.log(localStorage.getItem('test'));
     */
     if(localStorage.getItem('bookmarks') === null){
     	// init array
     	var bookmarks = [];
     	//add to array
     	bookmarks.push(bookmark);
     	//set to localstorage
     	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
     } else {
     	// get bookmark from localstorage
     	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // add bookmark to array
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

     }


      document.getElementById('myForm').reset();
      fetchBookmarks();
	// prevent form submetting
	e.preventDefault(bookmark);
}
// delete bookmark
function deleteBookmark(url){
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  for(var i = 0; i<bookmarks.length; i++){
  	if(bookmarks[i].url == url){
  		bookmarks.splice(i, 1);
  	}
  }


  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  fetchBookmarks();
}

// fetch bookmarks
function fetchBookmarks(){
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
       
     // get ouput id
     var bookmarkResults = document.getElementById('bookmarkResults');
     // Build Result

     bookmarkResults.innerHTML = "";
     for(var i = 0; i<bookmarks.length; i++){
       var name = bookmarks[i].name;
       var url  = bookmarks[i].url;

       bookmarkResults.innerHTML += '<div class="well">'+
                                    '<h3>'+name+
                                    '<a class="btn btn-default" target="_blank" href="'+url+'">Visit</a>' +
                                    '<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a>' +
                                    '</h3>'+
                                    '</div>';
     }

	}

	// validate
	function validateForm(siteName, siteUrl){
		if(!siteName || !siteUrl){
      	alert('Please fill in the form');
      	return false;
      }
      var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
      var regex = new RegExp(expression);

      if(!siteUrl.match(regex)){
      	alert('Please use a valid URL!');
      	return false;
      }
      return true;
	}