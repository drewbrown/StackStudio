/*!
 * StackStudio 2.0.0-rc.1 <http://stackstudio.transcendcomputing.com>
 * (c) 2012 Transcend Computing <http://www.transcendcomputing.com/>
 * Available under ASL2 license <http://www.apache.org/licenses/LICENSE-2.0.html>
 */
/*jshint smarttabs:true */
/*global define:true console:true requirejs:true require:true*/
define([
        'jquery',
        'underscore',
        'backbone',
        'common',
        'opentip'
], function( $, _, Backbone, Common) {

    var newUserGuide = Backbone.View.extend({
        
        tooltips: [
            {showVent:"newUserGuide", eId:'#c_account_tip', message:'Create a Cloud Account to configure a connection to a cloud.', hideVent:'managementRefresh'},
            {showVent:'managementRefresh', eId:'#c_cred_tip', message:'Create a Cloud Credential to supply security credentials for use in a cloud.', hideVent:'cloudCredentialCreated'},
            {showVent:'cloudCredentialCreated', eId:'#resources_nav', message:'See your cloud resources in Cloud Management.', hideVent:undefined}
        ],
        
        initialize: function() {
            var view = this;
            this.tooltips.reverse().forEach(function(t){
                view.create_tooltip(t['showVent'],t['eId'],t['message'],t['hideVent']);
            });
            setTimeout(function(){
                Common.vent.trigger("newUserGuide");
            },2000);
        },
        
        create_tooltip: function(showVent,eId,message,hideVent){
            if(showVent !== undefined){
                Common.vent.on(showVent, function(){
                    $(eId).mouseover();
                });
            }
            setTimeout(function(){
                $(eId).opentip(message, {     showOn: "mouseover",
                                              hideOn: "click",
                                              target:$(eId),
                                              tipJoint:"left",
                                              style:"dark"});
            }, 1000);
            if(hideVent !== undefined){
                Common.vent.on(hideVent, function(){
                    $(eId).click();
                });
            }
        }
         
    });

    return newUserGuide;
});
