
$(function(){

	$("#mainDiv").hide();
	$("#logout").hide();
		if(window.localStorage.getItem("Authorization")===null){
    } else {
        authToken=window.localStorage.getItem("Authorization");
        $(login());
    }
	$.get("https://hacker-news.firebaseio.com/v0/topstories.json").then(function(data){
		console.log(data);
		var topTen = data.slice(0,10);
		topTen.forEach(function(el) {
			$.get("https://hacker-news.firebaseio.com/v0/item/" + el + ".json").then(function(data){
				var appDiv = '<div data-id="' + data.id + '" data-by="' + data.by + '" data-title="' + data.title + '" data-url="' + data.url + '" class="topTen">' + '<button type="button">&#9734</button>' + '<a href="' + data.url + '">' + data.title  + " | by: " + data.by;
				$("#mainDiv").append(appDiv);
			});
		});

	});



	// $("#mainDiv").on('click', function(event){
	// 	if($(event.target).is(":button")){
	// 		event.preventDefault();
	// 		$(event.target).html("&#9733");
	// 		var id = $(event.target).parent().data("id");
	// 		var by = $(event.target).parent().data("by");
	// 		var title = $(event.target).parent().data("title");
	// 		var url = $(event.target).parent().data("url");
	// 		$.post("https://hn-favorites.herokuapp.com/stories.json", {"hacker_news_story":{"title": title, "by": by, "story_id": id, "url": url}}).then(function(response){
	// 		});
	// 	}
	// });



	$("#mainDiv").on('click', function(event){
		if($(event.target).is(":button")){
			event.preventDefault();
			$(event.target).html("&#9733");
			var id = $(event.target).parent().data("id");
			var by = $(event.target).parent().data("by");
			var title = $(event.target).parent().data("title");
			var url = $(event.target).parent().data("url");
			$.ajax({
	            method: "POST",
	            headers: {Authorization: authToken},
	            url: "https://hn-favorites.herokuapp.com/stories.json",
	            data: {"hacker_news_story":{"title": title, "by": by, "story_id": id, "url": url}},
	            dataType: "json"
	        }).then(function(response){
	            
	        });
		}
	});











	$("#login").on('submit', function(event){	
		event.preventDefault();
		var email = ($("#mail")).val();
		var password = ($("#pass")).val();
		$.post("https://hn-favorites.herokuapp.com/login", {"email": email, "password": password}).then(function(response){
			var authToken = response.auth_token;
			window.localStorage.setItem("Authorization", authToken);
				$(login());
		});
	});

	$("#logout").on('submit', function(event){
		event.preventDefault();
		window.localStorage.clear();
		$(logout());
	});


//login / logout functions

function logout(){
		$("#login").show();
		$("#logout").hide();
		$("#mainDiv").hide();
		return;
	}

function login(){
		$("#login").hide();
		$("#mainDiv").show();
		$("#logout").show();
		return;
	}



});


