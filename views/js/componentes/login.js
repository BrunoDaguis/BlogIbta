app.component('loginUser', {
  bindings:{
    login :'<'
   },
   templateUrl: 'componentes/login.html',
    controller:  function ($http, $sce) {
    let login = this;
      login.entrar = {}
    }
});
