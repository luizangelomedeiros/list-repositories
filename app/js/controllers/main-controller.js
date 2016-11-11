angular.module('listGithub').controller('ListRepositories',['$scope','$http', function($scope,$http) {

    /* SETANDO ITENS NA LISTA */
    $scope.itens = [];

    $http.get('https://api.github.com/users/luizangelomedeiros/repos?type=owner').success(function(data) {
       $scope.itens = data;
    });
      
    /* RETORNA QTD DE ITENS DA LISTA */
    $scope.numeroDeItens = function(){
        var num = $scope.itens.length;
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

    /* ABRE MODAL */
    $scope.mostraModal = false;
    $scope.tarefaModal, $scope.itemModal = "";
    $scope.abreModal = function(item){
        var tarefa = $scope.itens[item].texto;
        $scope.tarefaModal  = tarefa;
        $scope.itemModal    = item;
        $scope.mostraModal  = !$scope.mostraModal;
    };

    /* REMOVE ITEM NA LISTA */
    apagaItemTodoList = function(item){
        $scope.itens.splice(item, 1);
    };

    /* ABRE ALERT */
    $scope.mostraAlert = false;
    $scope.tipoAlert = "";
    abreAlert = function(item, id){
        $scope.tipoAlert    = item;
        $scope.formAlert    = id;
        $scope.mostraAlert  = !$scope.mostraModal;
    };
}]);    