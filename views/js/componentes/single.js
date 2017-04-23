app.component('singlePosts', {
  bindings:{
    singlePosts :'<'
   },
   templateUrl: 'componentes/single.html',
    controller:  function ($http, $sce, $routeParams, $sanitize) {
    let single = this;
    let disqus_config = function () {
    this.page.url = "http://localhost:5000";
    this.page.identifier = "Tech News";
    };
    (function() { // DON'T EDIT BELOW THIS LINE
    var d = document, s = d.createElement('script');
    s.src = 'https://tech-news-2.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
    })();
      $http.get('api/post/'+$routeParams._id).success(function(data){
         single.singlePosts = data;
         console.log(single.singlePosts);
       })
       .error(function(erro){
           console.log(erro);
       });
    }
});
