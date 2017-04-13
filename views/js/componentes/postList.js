app.component('postList', {
  bindings:{
    posts :'<'
   },
   templateUrl: 'componentes/postList.html',
    controller:  function ($http) {
    let url = 'api/post/'
    let post = this;
      $http(url).success(function(data){
         post.posts = data;
         console.log(post.posts);
       })
       .error(function(erro){
           console.log(erro);
       });
    }
});
