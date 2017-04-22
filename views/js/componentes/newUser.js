app.component('newUser', {
  bindings:{
    user :'<'
   },
   templateUrl: 'componentes/new_user.html',
   controller:  function ($http, $sce) {
    let user = this;
    user.submeter = function(){
        $http.post('/api/user', user.formulario)
          .success(function(){
            user.formulario = {}
            console.log(user.formulario);
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
