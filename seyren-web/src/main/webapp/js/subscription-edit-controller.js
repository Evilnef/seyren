/*global angular,seyrenApp,console,$ */
(function () {
    'use strict';

    seyrenApp.controller('SubscriptionEditModalController', function SubscriptionEditModalController($scope, $rootScope, Subscriptions, Seyren, Templates) {
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

        $scope.notifyOnWarnClicked = function () {
            $scope.subscription.ignoreWarn = !$scope.subscription.notifyOnWarn;
        };

        $scope.notifyOnErrorClicked = function () {
            $scope.subscription.ignoreError = !$scope.subscription.notifyOnError;
        };

        $scope.notifyOnOkClicked = function () {
            $scope.subscription.ignoreOk = !$scope.subscription.notifyOnOk;
        };

        $scope.create = function () {
            $("#createSubscriptionButton").addClass("disabled");
            Subscriptions.create({checkId: $scope.check.id}, $scope.subscription, function () {
                $("#createSubscriptionButton").removeClass("disabled");
                $("#editSubscriptionModal").modal("hide");
                $scope.$emit('subscription:created');
            }, function () {
                $("#createSubscriptionButton").removeClass("disabled");
                console.log('Create subscription failed');
            });
        };

        $scope.update = function () {
            $("#updateSubscriptionButton").addClass("disabled");
            $scope.subscription.templateId = $scope.currentTemplate.id;
            Subscriptions.update({
                checkId: $scope.check.id,
                subscriptionId: $scope.subscription.id
            }, $scope.subscription, function () {
                $("#updateSubscriptionButton").removeClass("disabled");
                $("#editSubscriptionModal").modal("hide");
                $scope.$emit('subscription:updated');
            }, function () {
                console.log('Saving subscription failed');
            });
        };

        $scope.reset = function () {
            $scope.subscription = angular.copy($scope.master);
        };

        $scope.loadTemplates = function () {
            Templates.query({}, function (data) {
                $scope.templates = data;
                $scope.currentTemplate = data.values.filter(function (template) {
                    return template.id === $scope.subscription.templateId;
                })[0];
            });
        };

        $scope.selectCurrentTemplate = function() {
            $scope.currentTemplate = $scope.templates.values.filter(function (template) {
                return template.id === $scope.subscription.templateId;
            })[0];
        };

        $rootScope.$on('subscription:edit', function () {
            var editSubscription = Seyren.subscriptionBeingEdited();
            $scope.loadTemplates();
            if (editSubscription) {
                $scope.newSubscription = false;
                $scope.subscription = editSubscription;
                $scope.selectCurrentTemplate();
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
