app.component('newPost', {
  bindings:{
    post :'<'
   },
   templateUrl: 'componentes/new_post.html',
   controller:  function ($http, $sce) {
    let post = this;
     post.users = [];
      $http.get('/api/user')
      .success(function(users){
        post.users = users;
        console.log(users);
      }).error(function(error){
        console.log(error);
    });
    post.submeter = function(){
      $http.post('/api/post', post.posts)
        .success(function(){
          post.posts = {}
          console.log(post.posts);
          post.mensagem = "Post criado com sucesso"
          user.class ="alert-success"
        }).error(function(){
            console.log('não gravou');
            post.mensagem = "verifique os campos e tente novamente"
            user.class ="alert-danger"
      });
    }
  }
});
