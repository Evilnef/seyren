/*global angular,seyrenApp,console,$ */
(function () {
    'use strict';

    seyrenApp.controller('TemplateEditModalController', function TemplateEditModalController($scope, $rootScope, Seyren, Templates) {
        $scope.isAlreadyExists = false;

        $('#editSubscriptionModal').on('shown', function () {
            $('#template\\.name').focus();
        });

        $scope.create = function () {
            $("#createTemplateButton").addClass("disabled");
            $scope.template.content = $scope.template.content.replace(/(\r\n|\n|\r)/gm,"");
            Templates.create($scope.template, function () {
                $("#createTemplateButton").removeClass("disabled");
                $("#editTemplateModal").modal("hide");
                $scope.$emit('template:created');
            }, function () {
                $("#createTemplateButton").removeClass("disabled");
                console.log('Create template failed');
            });
        };

        $scope.deleteTemplate = function (id) {
            Templates.remove({templateId: id} ,function () {
                console.log('Delete template successful');
            }, function () {
                console.log('Delete template failed');
            });
        };

        $scope.checkName = function () {
            $scope.loadTemplates();
            if ($scope.templates !== null && $scope.templates !== undefined) {
                return $scope.templates.values.some(function (tmp) {
                    return tmp.name === $scope.template.name;
                });
            } else {
                return false;
            }
        };

        $scope.$watch("template.name", function () {
            $scope.isAlreadyExists = $scope.checkName();
        });

        $scope.onNameChanged = function () {
            $scope.isAlreadyExists = $scope.checkName();
        };

        $scope.loadTemplates = function () {
            Templates.query({}, function (data) {
                $scope.templates = data;
            });
        };

        $scope.selectTemplate = function (id) {
            $scope.template = $scope.templates.values.filter(function (template) {
                return template.id === id;
        })[0];
        };

        $rootScope.$on('template:edit', function () {
            $scope.template = {};
            $scope.template.name = null;
            $scope.template.content = null;
            $scope.loadTemplates();
        });
    });

}());
