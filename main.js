$(document).ready(function(){
var nextPage;
var usernam;
// bind click event for button
$('#loadMore').on('click', function() {
  getFollowers(nextPage);
});

// getFollowers function with one parameter - current page
function getFollowers(page) {
  //followerCount
  var followerCount=1;
  // how many followers per page to retrieve
  perPage = 30;

  // update next page global variable
  nextPage = page + 1;

  $.ajax({
    url: 'https://api.github.com/users/' + usernam + '/followers?per_page=' + perPage + '&page=' + page,
    data: {
      client_id: 'd4e57acd4338cfad707c',
      client_secret: '13e753f41b905b4d7d84a122e3404b6f814a0bed'
    }
  }).done(function(followers) {
    $.each(followers, function(index, follower) {
      $('#followers').append(`
            <div>
              <h3>${followerCount}</h3>
              <div class="row">
                <div class="col-md-10">
                <img class="follower-avatar" src="${follower.avatar_url}" alt="" width="10px" height="10px"/>
                <p>${follower.login}</p>
                </div>
                <div class="col-md-2">
                  <a href="${follower.html_url}" target="_blank" class="btn">View profile</a>
                </div>
              </div>
            </div>
          `);
      followerCount++;
    });

    // if the array returned has fewer people than we requested per page,
    // we've found all the followers. hide the button
    if (followers.length < perPage) {
    //  $('button').hide();
    }
  });
}
$('#username').on('keyup',function(e){
  let username=e.target.value;
// Make request to Github
$.ajax({
  url: 'https://api.github.com/users/' + username,
  data: {
    client_id: 'd4e57acd4338cfad707c',
    client_secret: '13e753f41b905b4d7d84a122e3404b6f814a0bed'
  }
}).done(function(user) {
  // Get first page of followers
  getFollowers(1);
  // Profile HTML
  $('#profile').append(`
        <div>
          <div>
            <div class="row">
              <div class="col-md-3">
                <img  src="${user.avatar_url}">
                <div>
            		<h3>${user.name}</h3>
          		</div>
                <a target="_blank" class="btn" href="${user.html_url}">View Profile</a>
              </div>
              <div class="col-md-9">
              <div>
              	<h1>Followers</h1> <br/>
              	<p>${user.followers}</p>
              </div>
              <div>
              	<h1>Followers</h1> <br/>
              	<p>2313123</p>
              </div>
              </div>
            </div>
          </div>
        </div>
        <h3 class="page-header">${user.name}'s followers</h3>
        <div id="followers"></div>
      `);
});
usernam=username;
});
});