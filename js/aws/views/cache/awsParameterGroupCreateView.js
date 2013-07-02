/*!
 * StackStudio 2.0.0-rc.1 <http://stackstudio.transcendcomputing.com>
 * (c) 2012 Transcend Computing <http://www.transcendcomputing.com/>
 * Available under ASL2 license <http://www.apache.org/licenses/LICENSE-2.0.html>
 */
/*jshint smarttabs:true */
/*global define:true console:true alert:true*/
define([
        'jquery',
        'underscore',
        'backbone',
        'views/dialogView',
        'text!templates/aws/compute/awsSecurityGroupCreateTemplate.html',
        '/js/aws/models/cache/awsCacheParameterGroup.js',
        '/js/aws/collections/vpc/awsVpcs.js',
        'icanhaz',
        'common'
        
], function( $, _, Backbone, DialogView, parameterGroupCreateTemplate, ParameterGroup, VPCs, ich, Common ) {
    
    /**
     * awsParameterGroupCreateView is UI form to create compute.
     *
     * @name InstanceCreateView
     * @constructor
     * @category Compute
     * @param {Object} initialization object.
     * @returns {Object} Returns a awsParameterGroupCreateView instance.
     */
    
    var AwsParameterGroupCreateView = DialogView.extend({

        credentialId: undefined,

        region: undefined,
        
        parameterGroup: new ParameterGroup(),
        
        vpcs: new VPCs(),
        
        // Delegated events for creating new instances, etc.
        events: {
            "dialogclose": "close"
        },

        initialize: function(options) {
            this.credentialId = options.cred_id;
            this.region = options.region;
            var createView = this;
            var compiledTemplate = _.template(parameterGroupCreateTemplate);
            this.$el.html(compiledTemplate);

            this.$el.dialog({
                autoOpen: true,
                title: "Create Parameter Group",
                resizable: false,
                width: 425,
                modal: true,
                buttons: {
                    Create: function () {
                        createView.create();
                    },
                    Cancel: function() {
                        createView.cancel();
                    }
                }
            });
            $("#vpc_select").selectmenu();
            
            this.vpcs.on( 'reset', this.addAllVPCs, this );
            this.vpcs.fetch({ data: $.param({ cred_id: this.credentialId, region: this.region }), reset: true });
        },

        render: function() {
            
        },
        
        addAllVPCs: function() {
            this.vpcs.each(function(vpc) {
               $("#vpc_select").append("<option>" + vpc.id + "</option>");
            });
            $("#vpc_select").selectmenu();
        },

        create: function() {
            var newParameterGroup = this.parameterGroup;
            var options = {};
            var issue = false;
            
            if($("#sg_name").val() !== "" && $("#sg_desc").val() !== "" ) {
                options.id = $("#sg_name").val();
                options.description = $("#sg_desc").val();
            }else {
                issue = true;
            }
            /*
            if($("#vpc_select").val() !== "No VPC") {
                options.vpc_id = $("#vpc_select").val();
            }
            */
            if(!issue) {
                newParameterGroup.create(options, this.credentialId, this.region);
                this.$el.dialog('close');
            } else {
                Common.errorDialog("Invalid Request", "Please supply all required fields.");
            }
        }
    });
    
    return AwsParameterGroupCreateView;
});
