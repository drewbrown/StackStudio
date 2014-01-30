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
            {eId:'c_account_tip', message:'Create a Cloud Account to configure a connection to a cloud.', hideVent:'managementRefresh'},
            {eId:'c_cred_tip', message:'Create a Cloud Credential to supply security credentials for use in a cloud.', hideVent:'managementRefresh'}
        ],
        
        initialize: function() {
            var view = this;
            var ttList = this.tooltips.reverse();
            var callback;
            ttList.forEach(function(t){
                callback = function(){view.create_tooltip(t['eId'],t['message'],t['hideVent'],callback);};
            });
            callback();
        },
        
        create_tooltip: function(eId,message,hideVent,callback){
            setTimeout(function(){
                $('#'+eId).opentip(message, { showOn: "creation",
                                              hideOn: "click",
                                              target:$('#'+eId),
                                              tipJoint:"left",
                                              style:"dark"});
            }, 1000);
            Common.vent.on(hideVent, function(){
                $('#'+eId).click();
                callback();
            });
        }
         
    });

    return newUserGuide;
});
