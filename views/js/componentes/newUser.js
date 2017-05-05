app.component('newUser', {
   templateUrl: 'componentes/new_user.html',
   controller:  function ($http, $sce, $routeParams) {
    let user = this;
    if($routeParams.userId){
        $http.get('/api/user' + $routeParams.userId)
        .success(function(usuario){
            user.user = usuario;
        }).error(function(erro){
            console.log(erro);
        });
    }
        user.submeter = function(){
        if(user.formulario){
            if(user.formulario._id){
                $http.put('/api/user'+ user.formulario._id, user.formulario)
                .success(function(){
                    user.mensagem = "editado com sucesso"
                }).error(function(){
                    user.mensagem = "verifique os campos e tente novamente"
                })
            }else{
                $http.post('/api/user', user.formulario)
                .success(function(){
                    user.formulario = {};
                    user.mensagem = "cadastro adicionado";
                    user.class="alert-success";
                }).error(function(){
                    console.log('não gravou');
                    user.mensagem = "verifique os campos e tente novamente"
                    user.class="alert-danger";
                });
             }
        }
    };
    // user.submeter = function(){
    //     $http.post('/api/user', user.formulario)
    //       .success(function(){
    //         user.formulario = {}
    //         console.log(user.formulario);
    //         user.mensagem = "usuário cadastro adicionado com sucesso"
    //         user.class ="alert-success"
    //       }).error(function(){
    //           console.log('não gravou');
    //           user.mensagem = "verifique os campos e tente novamente"
    //           user.class ="alert-danger"
    //       });
    // }
  }
});
