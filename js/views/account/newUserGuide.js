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
        
        events:{
            'click .new_user_guide':'new_user_event',
            'click #c_account_tip,#c_cred_tip':'createListHover',
            "click #create_group_button":'createButtonClick'
        },
        
        tooltips: [
            {showVent:"new_user_start", eId:'#c_account_tip', message:'Create a Cloud Account to configure a connection to a cloud.', hideVent:'managementRefresh'},
            {showVent:'managementRefresh', eId:'#c_cred_tip', message:'Create a Cloud Credential to supply security credentials for use in a cloud.', hideVent:'cloudCredentialCreated'},
            {showVent:'cloudCredentialCreated', eId:'#resources_nav', message:'See your cloud resources in Cloud Management.', hideVent:undefined}
        ],
        
        initialize: function() {
            var view = this;
            this.tooltips.forEach(function(t){
                view.create_tooltip(t['showVent'],t['eId'],t['message'],t['hideVent']);
            });
        },
        
        create_tooltip: function(showVent,eId,message,hideVent){
            var newId = this.makeid();
            $("#guide_element").append("<div id='"+newId+"'></div>");
            var newEid = "#"+newId;
            
            if(showVent !== undefined){
                Common.vent.on(showVent, function(){
                    $(newEid).mouseover();
                });
            }
            setTimeout(function(){
                $(newEid).opentip(message, {  showOn: "mouseover",
                                              hideOn: "click",
                                              target:$(eId),
                                              tipJoint:"left",
                                              style:"dark"});
            }, 1000);
            if(hideVent !== undefined){
                Common.vent.on(hideVent, function(){
                    $(newEid).click();
                });
            }
        },
        
        new_user_event: function(e) {
            Common.vent.trigger("new_user_start");
        },
        
        createListHover: function(e){
            setTimeout(function(){
                $("#create_group_button").opentip("Click here to create.", {showOn: "creation",
                                                              hideOn: "click",
                                                              target:$("#create_group_button"),
                                                              tipJoint:"top left",
                                                              style:"dark"});
            },1000);
        },
        
        createButtonClick: function(e){
            setTimeout(function(){
                //Opentip.lastZIndex = 1002;
                var create_button = $("button:contains('Create')[type='button']");
                create_button.opentip("Finalize and save.", {showOn: "creation",
                                                              hideOn: "click",
                                                              target:create_button,
                                                              tipJoint:"top left",
                                                              style:"dark"});
            },1000);
        },
        
        makeid: function (){
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for( var i=0; i < 5; i++ ){
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }

            return text;
        }
         
    });

    return newUserGuide;
});
