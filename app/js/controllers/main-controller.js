angular.module('listGithub').
controller('ListRepositories',['$scope','$http', 'Settings', function($scope, $http, Settings) {

    /* iniciando objeto itens */
    $scope.itens = [];
    
    /* iniciando variavel do filtro */
    $scope.filterRepositories = "";

    /* ordem da lista de repositorios*/
    var listOrder = "updated";

    /* tipos de repositorios*/
    var listType  = "owner";

    /* buscando conteudo em json do github */
    $http.get(
        Settings.url+'users/'+
        Settings.usuario+'/repos?sort='+listOrder+
        '&type='+listType+
        '&client_id='+Settings.id)
    .success(function(data) {
          $scope.itens = data;

    }).error(function() {
       alert("Ocorreu um erro !n\Tente novamente mais tarde.");
    });;
      
/* RETORNA QTD DE REPOSITÓRIO */
}]).filter('totalRepositories', function() {
    return function (itens) {
        var num = itens.length;
        var retorno = num;
        if(num<2){
            if(num<1){
                retorno = "Nenhuma";
            }
            retorno += " repositório encontrado ";
        }else{
            retorno += " repositórios encontrados ";
        }
        return retorno;
    };
});