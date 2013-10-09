/*!
 * StackStudio 2.0.0-rc.1 <http://stackstudio.transcendcomputing.com>
 * (c) 2012 Transcend Computing <http://www.transcendcomputing.com/>
 * Available under ASL2 license <http://www.apache.org/licenses/LICENSE-2.0.html>
 */
/*jshint smarttabs:true */
/*global define:true console:true */
define([
        'models/resource/resourceModel',
        'common'
], function( ResourceModel, Common ) {
    'use strict';

    var Stack = ResourceModel.extend({
        idAttribute : "StackName",

        fetchResources: function(options, credentialId, region){
            var url = Common.apiUrl + "/stackstudio/v1/cloud_management/aws/cloud_formation/stacks/"+ this.get("StackName") +"/resources?&cred_id=" + credentialId + "&region=" + region;
            this.sendAjaxAction(url, "GET", undefined,  "stackResourcesLoaded");
        },

        fetchEvents: function(options, credentialId, region){
            var url = Common.apiUrl + "/stackstudio/v1/cloud_management/aws/cloud_formation/stacks/"+ this.get("StackName") +"/events?&cred_id=" + credentialId + "&region=" + region;
            this.sendAjaxAction(url, "GET", undefined,  "stackEventsLoaded");
        },

        fetchTemplate: function(options, credentialId, region){
            var url = Common.apiUrl + "/stackstudio/v1/cloud_management/aws/cloud_formation/stacks/"+ this.get("StackName") +"/template?&cred_id=" + credentialId + "&region=" + region;
            this.sendAjaxAction(url, "GET", undefined,  "stackTemplateLoaded");
        }
    });

    return Stack;
});