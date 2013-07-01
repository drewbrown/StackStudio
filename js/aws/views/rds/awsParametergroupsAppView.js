/*!
 * StackStudio 2.0.0-rc.1 <http://stackstudio.transcendcomputing.com>
 * (c) 2012 Transcend Computing <http://www.transcendcomputing.com/>
 * Available under ASL2 license <http://www.apache.org/licenses/LICENSE-2.0.html>
 */
/*jshint smarttabs:true */
/*global define:true console:true */
define([
        'jquery',
        'underscore',
        'backbone',
        'views/featureNotImplementedView',
        'views/resource/resourceAppView',
        'text!templates/aws/rds/awsParameterGroupAppTemplate.html',
        '/js/aws/models/rds/awsDBParameterGroup.js',
        '/js/aws/collections/rds/awsDBParameterGroups.js',
        '/js/aws/views/rds/awsParameterGroupCreateView.js',
        'icanhaz',
        'common',
        'jquery.dataTables'
], function( $, _, Backbone, FeatureNotImplementedView, ResourceAppView,cacheClusterAppTemplate, CacheCluster, CacheClusters, CacheClusterCreate, ich, Common ) {
    'use strict';

    var AwsParametergroupsAppView = ResourceAppView.extend({
        
        template: _.template(cacheClusterAppTemplate),
        
        modelStringIdentifier: "id",
        
        columns: ["id", "family", "description"],
        
        idColumnNumber: 0,
        
        model: CacheCluster,
        
        collectionType: CacheClusters,
        
        type: "rds",
        
        subtype: "parametergroups",
        
        CreateView: CacheClusterCreate,
        
        events: {
            'click .create_button': 'createNew',
            'click #action_menu ul li': 'performAction',
            'click #resource_table tr': 'clickOne'
        },

        initialize: function(options) {
            if(options.cred_id) {
                this.credentialId = options.cred_id;
            }
            if(options.region) {
                this.region = options.region;
            }
            this.render();
            
            var cacheApp = this;
            Common.vent.on("parameterGroupAppRefresh", function() {
                cacheApp.render();
            });
            Common.vent.on("describeParameters", function(data) {
                cacheApp.addParameters(data);
            });
            
        },
        
        performAction: function(event) {
            var cluster = this.collection.get(this.selectedId);
            
            switch(event.target.text)
            {
            case "Delete":
                cluster.destroy(this.credentialId, this.region);
                break;
            }
        },
        /*
        render: function() {
            var featureNotImplemented = new FeatureNotImplementedView({feature_url: "https://github.com/TranscendComputing/StackStudio/issues/8", element: "#resource_app"});
            featureNotImplemented.render();
        },
        */
        
        toggleActions: function(e) {
            //Disable any needed actions
            var parameterGroup = this.collection.get(this.selectedId);
            
            parameterGroup.getParameters(this.credentialId,this.region);
        },
        
        addParameters: function(parameters){
            //$("#describe_table").append("<tr><td>1</td><td style='width:10px;'>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td></tr>");
            $.each(parameters, function(i, parameter) {
                $("#describe_table").append("<tr><td>"+parameter.ParameterName+"</td><td>"+parameter.ParameterValue+"</td><td>"+parameter.DataType+"</td><td>"+parameter.Source+"</td><td>"+parameter.IsModifiable+"</td><td>"+parameter.Description+"</td><td>"+parameter.ApplyType+"</td><td>"+parameter.AllowedValues+"</td></tr>");
            });
        }
    });
    
    return AwsParametergroupsAppView;
});