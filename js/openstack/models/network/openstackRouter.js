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

    var Router = ResourceModel.extend({

        validate: function(attrs, options) {
            if(attrs.name === "" || attrs.name === undefined)
            {
                return this.validationError;
            }
        },

        create: function(options, credentialId, region) {
            var url = Common.apiUrl + "/stackstudio/v1/cloud_management/openstack/network/routers?cred_id=" + credentialId;
            this.sendAjaxAction(url, "POST", {"router": options}, "routerAppRefresh");
        },
        
        destroy: function(credentialId) {
            var url = Common.apiUrl + "/stackstudio/v1/cloud_management/openstack/network/routers/"+ this.attributes.id +"?_method=DELETE&cred_id=" + credentialId;
            this.sendAjaxAction(url, "POST", undefined, "routerAppRefresh");
        },

        addInterface: function(options, credentialId, region) {
            var url = Common.apiUrl + "/stackstudio/v1/cloud_management/openstack/network/routers/" + this.attributes.id + "/add_router_interface?_method=PUT&cred_id=" + credentialId;
            this.sendAjaxAction(url, "POST", {"router": options}, "router:interfaceRefresh");
        },

        removeInterface: function(options,credentialId) {
            var url = Common.apiUrl + "/stackstudio/v1/cloud_management/openstack/network/routers/" + this.attributes.id + "/remove_router_interface?_method=PUT&cred_id=" + credentialId;
            this.sendAjaxAction(url, "POST", {"router": options}, "router:interfaceRefresh");
        }

    });

    return Router;
});