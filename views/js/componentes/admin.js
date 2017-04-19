app.component('adminPanel', {
  bindings:{
    admin :'<'
   },
   templateUrl: 'componentes/admin.html',
   controller:  function ($http, $sce) {
    let admin = this;
      admin.painel = {}
    }
});
