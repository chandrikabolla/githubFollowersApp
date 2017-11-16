$(document).ready(function(){
var totalFollowers=[];
var pageCounter=1;
var numOfFollowers;
var totalDisplayed=0;

$("#username").on('keyup',function(e){
	let username=e.target.value;
	//show tooltip if non-alphanumeric characters are entered
	//if username starts or ends with - 
	//show tooltip (or) error message
	//return
	//TODO:

	if(/^[a-zA-Z0-9- ]*$/.test(username) == false) {
    $("#input-error").css("color","red");
    return;
	}
	if(/^[a-zA-Z0-9- ]*$/.test(username) == true) {
    $("#input-error").css("color","lightblue");
    
	}
	if (username.toLowerCase().indexOf("--") >= 0)
	{
		$("#input-error").css("color","red");
    return;
	}

	//if username contains non-alphanumeric characters
	//show tooltip
	//return
	//TODO:


	//make request to github
	$.ajax({
		url:'https://api.github.com/search/users?q='+username,
		data:{
			client_id:'d4e57acd4338cfad707c',
			client_secret:'13e753f41b905b4d7d84a122e3404b6f814a0bed'
		}
	}).done(function(users){
		
		console.log("username is: "+username+" Users found: "+users.items.length);
		console.log(users);
		if(users.items.length>0)
		{

			$('#suggestions').css("display","block");
			$('#suggestions').html(``);
			$.each(users.items,function(index,user){
				console.log("index at: "+index);
				$('#suggestions').append(`
					
					<button class="btn linkToUser" target="profile" id="${user.login}" style="display:inline-block"> 
					
					<img src="${user.avatar_url}" id="${user.login}" data-toggle="tooltip" data-placement="top" title="${user.login}" class="img-circle" width="45px" height="45px"/>
					
					${user.login}
					
					</button>
					
					

				`);

			});
		}
		//if no users are found 
		else{

			$('#suggestions').html(``);

		}
		
				
		});
		
		
	});
$('#suggestions').on('click','button.linkToUser',function(e){
	var username=$(e.target).attr('id');
	console.log(username);
	
/*});


$('#submitBtn').on('click',function(e){
	let username=$("#username").val();
*/	//make request to github
	$.ajax({
		url:'https://api.github.com/users/'+username,
		data:{
			client_id:'d4e57acd4338cfad707c',
			client_secret:'13e753f41b905b4d7d84a122e3404b6f814a0bed'
		}
	}).done(function(user){
		var bio;
		$("#suggestions").html(``);
		$("#suggestions").css("display","none");
		$("#username").val(username);
		
		if(user.bio==="null")
		{
			bio="User not created his bio YET";
		}
		$('#profile').html(`
			<div class="row" id="avatar">
			<div class="col-lg-12 col-md-5 col-sm-5">
			<img src="${user.avatar_url}" class="thumbnail" width="250px" height="250px">
			<h3> User : ${user.login}</h3>
			<h4>Followers: ${user.followers}</h4>
			</div>
			<div class="col-lg-12 col-md-7 col-sm-7">
			<h4> Little info</h4>
			<p>Repos:${user.public_repos}</p>
			<p class="user-bio">Bio:${user.bio}</p>
			</div>
			</div>
			`);
		$("user-bio").html(bio);
			
		numOfFollowers=user.followers;
		totalDisplayed=0;
		$("#followers").html(``);
		$("#followers").followerFunction(username,30,pageCounter);
		
		
	});
	


});




$.fn.followerFunction=function(username,per_page,pageNumber){
	//var pageNumber=1;
	var empty=false;
	
	$.ajax({

			url:'https://api.github.com/users/'+username+'/followers?per_page='+per_page+'&page='+pageNumber,
			data:{
				client_id:'d4e57acd4338cfad707c',
				client_secret:'13e753f41b905b4d7d84a122e3404b6f814a0bed',
				
		}
		}).done(function(followers){

			if(jQuery.isEmptyObject(followers))
			{
				empty=true;
				$("#loadMore").html(`No more results found`);
			}
			if(!jQuery.isEmptyObject(followers))
			{
				var pointerAt=0;
				console.log(followers.length);
				$("#loadMore").remove();
				if(numOfFollowers>totalDisplayed)
					{
					$("#followersMsg").append(`
						<button id="loadMore" class="btn btn-info col-md-4 col-md-offset-4">
						<i class="fa fa-spinner fa-pulse fa-3x fa-fw" id="loading"></i>
<span class="sr-only">Loading...</span>
</button>
						
						`);
				}

				$.each(followers,function(index,follower){
				//console.log("index at: "+index);
				pointerAt++;
				totalFollowers.push(follower);
				$('#followers').append(`
					
							<img src="${follower.avatar_url}" id="${follower.login}" data-toggle="tooltip" data-placement="top" title="${follower.login}" class="img-circle follower" width="75px" height="75px"/>
							
					
				`);
			
			$('[data-toggle="tooltip"]').tooltip();
				totalDisplayed++;
							
			
			});
				
		
				$("#loading").remove();
					if(numOfFollowers>totalDisplayed)
					{
					$("#loadMore").html(`Load More`);
				}
				
			//disable Load More condition
				if(followers.length<per_page){
					$("#loadMore").html(`No more results`);
					$("loadMore").attr("disabled","true");

				}
				if(numOfFollowers==totalDisplayed)
				{
					$("#loadMore").html(`End of Results`);
				}

			}
		});

		pageCounter=pageCounter+1;
		
	}
$('div#followersMsg').on('click','button#loadMore',function(e){
		let username=$("#username").val();
		console.log("page number: "+pageCounter);
		$("#followers").followerFunction(username,30,pageCounter);
		$('html, body').animate({
    scrollTop: ($('#loadMore').offset().top)
},500);
});




});
$( window ).on( "load", function() {
        console.log( "window loaded" );
 });