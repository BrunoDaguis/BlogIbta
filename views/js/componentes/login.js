app.component('loginUser', {
  bindings:{
    login :'<'
   },
   templateUrl: 'componentes/login.html',
    controller:  function ($http, $sce) {
    let login = this;
      login.entrar = function(){
        $http.post('/api/user/login', login.logon)
          .success(function(result){
            if(result === null){
              alert('nao existe')
              return;
            }
            console.log(login.logon);
            localStorage.setItem('user',result._id);
            login.mensagem = "login efetuado com sucesso"
            login.class ="alert-success"
        console.log('entrou');
      }).error(function(error){
        console.log(data);
      });
    }
  }
});
