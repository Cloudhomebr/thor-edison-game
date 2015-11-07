/**
 * Dashboard Controller
 * @path js/controllers/DashboardController.js
 * @author Joao Henrique Bellincanta Gomes <jonnes1@gmail.com>
 */
angular.module('DashboardController', [])
        .controller('DashboardController', function ($scope, $state, $timeout, blockUI, $translate) {
            
                $scope.current   = 0;
                $scope.goal      = 500;
                $scope.infoAbove = false;
                
                $timeout(function() {
                    $scope.current   = 200;
                }, 3000);

                var calculateBarPercent = function() {
                  var percent = ($scope.current / $scope.goal) * 100;

                  if (percent > 100) {
                    percent = 100;
                  }
                  if (percent < 15) {
                    $scope.infoAbove = true;
                  }

                  return percent;
                };

                $scope.$watch('current', function() {
                  $scope.barPercent = 100 - calculateBarPercent();
                  $scope.barStyle = 'transform: translateY(' + $scope.barPercent + '%)';
                });
                    
            /*blockUI.start(); 

            $timeout(function() { 
              blockUI.stop(); 
            }, 2000);*/
            $scope.teste = 'xxxx';
            /**
             * Funcao para trocar a linguagem
             * @param {siglaLang} langKey
             * @returns void
             */
            $scope.changeLanguage = function (langKey) {
                $translate.use(langKey);
            };
        });
