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
        'common',
        'text!templates/stacks/stackDesignTemplate.html',
        'ace-cdn',
        'ace/mode/json',
        'jquery.jstree'
], function( $, _, Backbone, Common, stacksDesignTemplate) {
    'use strict';

    var StackDesignView = Backbone.View.extend({

        template: _.template( stacksDesignTemplate ),

        editor: undefined,

        newTemplateResources: undefined,

        newResourceTree: undefined,

        events: {
            "click .jstree_custom_item": "treeFolderClick",
            "click .new_item_link": "addResource"
        },

        initialize: function() {
            $("#design_time_content").html(this.el);
            this.$el.html(this.template);
            this.editor = ace.edit("design_editor");
            this.editor.setTheme("ace/theme/monokai");
            this.editor.getSession().setUseWorker(false);
            this.editor.getSession().setMode(new (require("ace/mode/json")).Mode);
            this.editor.getSession().setValue('{' +
                    '\n\t"AWSTemplateFormatVersion": "2010-09-09",' +
                    '\n\t"Description": "New template created in StackStudio.",' +
                    '\n\t"Parameters": {},' +
                    '\n\t"Mappings": {},' +
                    '\n\t"Resources": {},' +
                    '\n\t"Outputs": {}' +
                '\n}'
            );
        },

        render: function() {
            this.newResourceTree = $("#new_resources").jstree({ 
                // List of active plugins
                "plugins" : [ 
                    "json_data", "crrm", "themeroller"
                ],
                
                "core": {
                    "animation": 0
                 },

                "json_data" : { 
                    "ajax": {
                        "url": "samples/cloud_resources.json",
                        "success": function(data) {
                            var services = {};
                            var itemId;
                            $.each(data, function(index, d) {
                                 if (services[d.service] === undefined) {
                                     services[d.service] = [];
                                 }
                                 //Add reference to parent tree
                                 d.parent_tree = "#new_resources";
                                 itemId = d.label.toLowerCase().replace(/\s/g, "_");
                                 services[d.service].push({
                                     "data": {
                                         "title": d.label, 
                                         "attr": {
                                             "id": itemId, 
                                             "class": "new_item_link"
                                         } 
                                     },
                                     "attr": {"id": itemId + "_container"},
                                     "metadata": d
                                 });
                            });
                            
                            var treeData = [];
                            $.each(services, function(s, v) {
                                treeData.push({
                                    data: s,
                                    children: v,
                                    "metadata": {"parent_tree": "#new_resources"} 
                                });
                            });
                            return treeData;
                        }
                    },
                    "correct_state": false
                },
                
                "themeroller": {
                    "item": "jstree_custom_item"
                }
            });
        },

        addResource: function(event) {
            var resource = $(event.currentTarget.parentNode).data();
            var groupSelector = "#current_" + resource.group.toLowerCase();
            var content;

            content = this.editor.getValue();
            if (content.replace(/\s/g,"") !== '') {
                content = jQuery.parseJSON(content);
            } else {
                content = {};
            }

            if (!content[resource.group]) {
                content[resource.group] = {};
            }

            $.extend(content[resource.group], resource.template);
            this.editor.setValue(JSON.stringify(content, null,'\t'));

            var range = this.editor.find(resource.name);
            this.editor.getSelection().setSelectionRange(range);
        },

        treeFolderClick: function(event) {
            if($(event.target.parentElement).hasClass("jstree-closed")) {
                $(event.target.parentElement).removeClass("jstree-closed");
                $(event.target.parentElement).addClass("jstree-open");
            }else{
                $(event.target.parentElement).removeClass("jstree-open");
                $(event.target.parentElement).addClass("jstree-closed");
            }
            return false;
        }
    });

    return StackDesignView;
});