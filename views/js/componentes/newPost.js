app.component('newPost', {
  bindings:{
    post :'<'
   },
   templateUrl: 'componentes/new_post.html',
   controller:  function ($http, $sce) {
    let post = this;
    post.submeter = function(){
        $http.post('/api/post', post.posts)
          .success(function(){
            post.posts = {}
            console.log(post.posts);
            user.mensagem = "usuário cadastro adicionado com sucesso"
            user.class ="alert-success"
          }).error(function(){
              console.log('não gravou');
              user.mensagem = "verifique os campos e tente novamente"
              user.class ="alert-danger"
          });
    }
  }
});
