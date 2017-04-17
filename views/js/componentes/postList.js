app.component('postList', {
  bindings:{
    posts :'<'
   },
   templateUrl: 'componentes/postList.html',
    controller:  function ($http, $sce) {
    let post = this;
      $http.get('api/post/').success(function(data){
         post.posts = data;
         console.log(post.posts);
       })
       .error(function(erro){
           console.log(erro);
       });
    }
});
