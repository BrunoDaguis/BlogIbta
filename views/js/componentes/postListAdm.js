app.component('postAdm', {
  bindings:{
    admPosts :'<'
   },
   templateUrl: 'componentes/post-list-adm.html',
    controller:  function ($http, $sce, $scope, $timeout) {
    let post = this;
    $http.get('api/post/').success(function(data){
       post.admPosts = data;
       console.log(post.admPosts);
     })
     .error(function(erro){
         console.log(erro);
     });
    post.remover = function(post){
       $http.delete('/api/post/'+post._id)
       .success(function(){
           let indexPost = $scope.admPosts.indexOf(post);
           $scope.admPosts.splice(indexPost, 1)
           post.mensagem = ' removido com sucesso'
       }).error(function(err){
           console.log(err);
       })
    }
    }
});
