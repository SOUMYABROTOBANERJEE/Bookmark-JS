//alert("Press F12 Bitch");
//Listen for form submission


 document.getElementById('myform').addEventListener('submit',savebk);

 function savebk(e)
 {
	//console.log('It displays'); // this flashes and is not workable
	 
	var sitename=document.getElementById('sitename').value; //as in HTML this is given as an input in the form as site name
	var siteurl=document.getElementById('siteurl').value; 

	//the .value is used as else it prints the entire HTML statement


	//We use an array of objects to store in local storage
	var bookmark=
	{
		name:sitename,
		url:siteurl
	}

	//Check if both fields are empty or not

	//console.log(sitename);
	if(!validatebk(sitename,siteurl))
	{
		return false;
	}

	//Local Storage (by default stores STRINGS only)
	//localStorage.setItem('test','foo') //format(sitename,siteurl) as given by var bookmark
	//console.log(localStorage.getItem(sitename));

	//We need to check if there is a bookmark in local storage, fetch it and save it
	if(localStorage.getItem('bookmarks') == null )
	{ 
		//no elements previously entered
		var bookmarks=[];
		bookmarks.push(bookmark); // bookmark is the object(dict)
		console.log('Entered!');
		localStorage.setItem('bookmarks',JSON.stringify(bookmarks)); //as bookmarks is a JSON array and stringify converts it into string 
	}
	 else 
	 {
    // Get bookmarks from localStorage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Add bookmark to array
    	if (checkd(sitename,siteurl,bookmarks)==true)
    	{
    	bookmarks.push(bookmark);
   		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));// Re-set back to localStorage
		}
		else
		{
			
			
		var bookmarks=[];
		bookmarks.push(bookmark); // bookmark is the object(dict)
		console.log('Entered!');
		localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
			
		}
    
    
     }
    // Clear form
 // document.getElementById('myForm').reset();

  fetchbk();
  e.preventDefault();//stops the flashing of the log result 

 }

  function fetchbk()
	{
		var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
		var bookmarksres=document.getElementById('bookmarksresults');
		bookmarksres.innerHTML='';

		// loop through all the bookmarks in the local storage
		// and print them

		for (var i = 0; i< bookmarks.length; i++) 
		{
			var name=bookmarks[i].name;
			var url=bookmarks[i].url;
			bookmarksres.innerHTML+=	'<div class="out">'+
										'<h3>'+name+'</h3>'+'<br>'+'<h6>'+'<I>'+url+'</I>'+'<br>'+'</h6>'+'<h3>'+
										'<a class="btn btn-default" target="_blank" href="'+addhttp(url)+'">Visit</a>'+
										'<br>'+
										'<a onclick="deletebk(\''+url+'\')"class="btn btn-danger" href="#">Delete</a>'+
										'</h3>'+
										'</div>';
		}
	}


 function deletebk(url)
 {
	var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
	for (var i = 0; i < bookmarks.length; i++) 
	{
		if(bookmarks[i].url==url)
		{	bookmarks.splice(i,1);
		}
	}

	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  // Re-fetch bookmarks
	fetchbk();
	
  }

  function validatebk(sitename,siteurl){
  	if(!sitename || !siteurl)
	{
		alert('Please enter the fields');
		return false;
	}

		//regular expression (pattern matching) used in form valdation
	  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  	  var regex = new RegExp(expression);

  	  // siteurl validation checking
  	  if (!siteurl.match(regex)) {
  	  	alert('Please Enter Valid URL only');
  	  	return false;
  	  }
  	  return true;
  }

  function checkd(sitename, siteurl ,bookmarks)
  {
  	for (var i = 0; i < bookmarks.length; i++) 
  	{
  		if(bookmarks[i].name == sitename && bookmarks[i].url==siteurl && bookmarks[i].name != null)
  			{
  				alert('Name and URL already present')
  				return false;
  			}
  			else
  			{
  				return true;
  			}
  	}   

  }

  function addhttp(url) {
  if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
      url = "http://" + url;
  }
  return url;
}


 