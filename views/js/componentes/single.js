app.component('singlePosts', {
  bindings:{
    singlePosts :'<'
   },
   templateUrl: 'componentes/single.html',
    controller:  function ($http, $sce, $routeParams) {
    let single = this;
      $http.get('api/post/'+$routeParams._id).success(function(data){
         single.singlePosts = data;
         console.log(single.singlePosts);
       })
       .error(function(erro){
           console.log(erro);
       });
    }
});
