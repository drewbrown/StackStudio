/*jshint smarttabs:true */
/*global loadFixtures:false, setFixtures:false */
define(
    [
        'jquery',
        'common',
        'views/account/accountManagementView',
        'views/account/cloudAccountManagementView',
        'text!templates/account/managementTemplate.html',
        'jasmine-jquery'
    ],
    function($, Common, AccountManagementView, CloudAccountManagementView, ManagementTemplate) {
        //jasmine.getFixtures().fixturesPath = 'templates/';
        Common.cache('account', { group_policies: []});
        describe("Account Management View Tests", function() {
            var accountManagementView = new AccountManagementView();

            xit("render is callable", function() {
                 var renderSpy = spyOn(accountManagementView, 'render');
                 accountManagementView.render();
                 expect(accountManagementView.render).toHaveBeenCalled();
            });

            xit("addAllGroups is callable", function() {
                 var renderSpy = spyOn(accountManagementView, 'addAllGroups');
                 accountManagementView.addAllGroups();
                 expect(accountManagementView.addAllGroups).toHaveBeenCalled();
            });

            xit("addAllCreds is callable", function() {
                 var renderSpy = spyOn(accountManagementView, 'addAllCreds');
                 accountManagementView.addAllCreds();
                 expect(accountManagementView.addAllCreds).toHaveBeenCalled();
            });

            xit("addAllPolicies is callable", function() {
                 var renderSpy = spyOn(accountManagementView, 'addAllPolicies');
                 accountManagementView.addAllPolicies();
                 expect(accountManagementView.addAllPolicies).toHaveBeenCalled();
            });

            xit("addAllCloudAccounts is callable", function() {
                 var renderSpy = spyOn(accountManagementView, 'addAllCloudAccounts');
                 accountManagementView.addAllCloudAccounts();
                 expect(accountManagementView.addAllCloudAccounts).toHaveBeenCalled();
            });

            xit("selectManagement is callable", function() {
                 var renderSpy = spyOn(accountManagementView, 'selectManagement');
                 accountManagementView.selectManagement();
                 expect(accountManagementView.selectManagement).toHaveBeenCalled();
            });

            xit("selectGroup is callable", function() {
                 var renderSpy = spyOn(accountManagementView, 'selectGroup');
                 accountManagementView.selectGroup();
                 expect(accountManagementView.selectGroup).toHaveBeenCalled();
            });

            xit("selectCloudAccount is callable", function() {
                 var renderSpy = spyOn(accountManagementView, 'selectCloudAccount');
                 accountManagementView.selectCloudAccount();
                 expect(accountManagementView.selectCloudAccount).toHaveBeenCalled();
            });

            xit("selectCloudCred is callable", function() {
                 var renderSpy = spyOn(accountManagementView, 'selectCloudCred');
                 accountManagementView.selectCloudCred();
                 expect(accountManagementView.selectCloudCred).toHaveBeenCalled();
            });

            xit("selectPolicy is callable", function() {
                 var renderSpy = spyOn(accountManagementView, 'selectPolicy');
                 accountManagementView.selectPolicy();
                 expect(accountManagementView.selectPolicy).toHaveBeenCalled();
            });

            xit("addUser is callable", function() {
                 var renderSpy = spyOn(accountManagementView, 'addUser');
                 accountManagementView.addUser();
                 expect(accountManagementView.addUser).toHaveBeenCalled();
            });

            xit("close is callable", function() {
                 var renderSpy = spyOn(accountManagementView, 'close');
                 accountManagementView.close();
                 expect(accountManagementView.close).toHaveBeenCalled();
            });
        });

        describe("Account Management jQuery Bindings Tests", function() {
            var accountManagementView;

            beforeEach(function() {
                setFixtures('<section id="main"></section>');
                accountManagementView = new AccountManagementView();
            });

            xit("Verify views element is as intended", function() {
                //var element = $(accountManagementView.el);
                expect(accountManagementView.$el).toBe('section#main');
                expect($('#cloud_account_list')).toBeEmpty();
                expect($('#cred_list')).toBeEmpty();
                expect($('#group_list')).toBeEmpty();
                expect($('#policy_list')).toBeEmpty();
                expect($('#user_list')).toBeEmpty();
                expect($('#source_control_list')).toBeEmpty();
            });

            // XXX - Plan of action is to spyOn the internal accountManagementView instance bindings
            // and trigger them and then check markup for each section population. These will still
            // fail without proper data sets. Thought: stub out the spy and provide dataset! :-)
            //
            // Then spyOn each initialize() method in each subApp view class and trigger different
            // views with different arguments and check that the proper view initialize() is called

            xit("trigger jQuery binding route:cloudSetup", function() {
                Common.router.trigger("route:cloudSetup");
                //console.info('cloudSetup: '+$('#main').html());
            });

            xit("trigger jQuery binding route:cloudSetup", function() {
                Common.router.trigger("route:cloudSetup");
                //console.info('cloudSetup: '+$('#main').html());
            });

            xit("trigger jQuery binding route:cloudSetup sending cloud-accounts", function() {
                Common.router.trigger("route:cloudSetup", 'cloud-accounts');
                //console.info('cloudSetup:cloud-accounts: '+$('#main').html());
                //expect($('#cloud_account_list')).not.toBeEmpty();
                //expect(Common.TargetView instanceof CloudAccountManagementView).toBeTruthy();
            });






            xit("trigger jQuery binding route:accountManagement sending cloud-credentials", function() {
                Common.router.trigger("route:accountManagement", 'cloud-credentials');
            });

            xit("trigger jQuery binding route:accountManagement sending users", function() {
                Common.router.trigger("route:accountManagement", 'users');
            });

            xit("trigger jQuery binding route:accountManagement sending policies", function() {
                Common.router.trigger("route:accountManagement", 'policies');
            });

            xit("trigger jQuery binding route:accountManagement sending policy", function() {
                Common.router.trigger("route:accountManagement", 'policy');
            });

            xit("trigger jQuery binding route:accountManagement sending groups", function() {
                Common.router.trigger("route:accountManagement", 'groups');
            });

            xit("trigger jQuery binding route:accountManagement sending groups_list", function() {
                Common.router.trigger("route:accountManagement", 'groups_list');
            });

            xit("trigger jQuery binding route:accountManagement sending cloud-credentials_list", function() {
                Common.router.trigger("route:accountManagement", 'cloud-credentials_list');
            });

            xit("trigger jQuery binding route:accountManagement sending cloud-accounts_list", function() {
                Common.router.trigger("route:accountManagement", 'cloud-accounts_list');
            });

            xit("trigger jQuery binding route:accountManagement sending configuration_managers", function() {
                Common.router.trigger("route:accountManagement", 'configuration_managers');
            });

            xit("trigger jQuery binding route:accountManagement sending continuous_integration", function() {
                Common.router.trigger("route:accountManagement", 'continuous_integration');
            });

            xit("trigger jQuery binding route:accountManagement sending source_control_repositories", function() {
                Common.router.trigger("route:accountManagement", 'source_control_repositories');
            });

            // Disabled for now becasue this binding calls homeView constructor,
            // then that constructor calls render and render calls displayPasswordRules
            // which attempts to parse JSON from sessionStorage which is not present in tests
            xit("trigger jQuery binding route:accountManagement sending home", function() {
                Common.router.trigger("route:accountManagement", 'home');
            });
        });
    }
);
