/*global angular,seyrenApp,console,$ */
(function () {
    'use strict';

    seyrenApp.controller('TemplateEditModalController', function TemplateEditModalController($scope, $rootScope, Seyren, Templates) {
        $scope.master = {
            target: null,
            hitsToNotify: 1,
            type: "EMAIL",
            messageType: "DEFAULT",
            ignoreWarn: false,
            ignoreError: false,
            ignoreOk: false,
            notifyOnWarn: true,
            notifyOnError: true,
            notifyOnOk: true,
            fromTime: "0000",
            toTime: "2359",
            su: true,
            mo: true,
            tu: true,
            we: true,
            th: true,
            fr: true,
            sa: true,
            enabled: true,
            templateId: null
        };

        $('#editSubscriptionModal').on('shown', function () {
            $('#subscription\\.target').focus();
        });

        /*$scope.create = function () {
            $("#createSubscriptionButton").addClass("disabled");
            Subscriptions.create({checkId: $scope.check.id}, $scope.subscription, function () {
                $("#createSubscriptionButton").removeClass("disabled");
                $("#editSubscriptionModal").modal("hide");
                $scope.$emit('subscription:created');
            }, function () {
                $("#createSubscriptionButton").removeClass("disabled");
                console.log('Create subscription failed');
            });
        };*/

        $scope.create = function () {
            $("#createSubscriptionButton").addClass("disabled");
            Templates.create($scope.template, function () {
                $("#createSubscriptionButton").removeClass("disabled");
                $("#editSubscriptionModal").modal("hide");
                $scope.$emit('subscription:created');
            }, function () {
                $("#createSubscriptionButton").removeClass("disabled");
                console.log('Create subscription failed');
            });
        };

        $scope.reset = function () {
            $scope.subscription = angular.copy($scope.master);
        };

        $scope.loadTemplates = function () {
            Templates.query({}, function (data) {
                $scope.templates = data;
                $scope.currentTemplate = data.values[0];
            });
        };

        $rootScope.$on('subscription:edit', function () {
            $scope.template.name = null;
            $scope.template.content = null;
            var editSubscription = Seyren.subscriptionBeingEdited();
            $scope.loadTemplates();
            if (editSubscription) {
                $scope.newSubscription = false;
                $scope.subscription = editSubscription;
                $scope.subscription.notifyOnWarn = !$scope.subscription.ignoreWarn;
                $scope.subscription.notifyOnError = !$scope.subscription.ignoreError;
                $scope.subscription.notifyOnOk = !$scope.subscription.ignoreOk;
            } else {
                $scope.newSubscription = true;
                $scope.subscription = {};
                $scope.reset();
            }
        });
    });

}());
