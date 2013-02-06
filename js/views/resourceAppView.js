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
        'icanhaz',
        'common',
        'views/resourceRowView',
        'jquery.dataTables',
        'wijmo'
], function( $, _, Backbone, ich, Common , ResourceRowView ) {
    'use strict';
    
    var ResourceAppView = Backbone.View.extend({
        selectedId: undefined,
        
        modelStringIdentifier: undefined,
        
        columns: [],
        
        idColumnNumber: 0,
        
        type: undefined,
        
        subtype: undefined,
        
        CreateView: undefined,
        
        el: '#resource_app',
        
        render: function() {
            this.$el.html(this.template);
            ich.refresh();
            $('button').button();
            $(".action_menu").menu({
                position: { my: 'left top', at: 'left bottom'}
            });
            
            this.$table = $('#resource_table').dataTable({"bJQueryUI": true});
            
            this.collection.on( 'add', this.addOne, this );
            this.collection.on( 'reset', this.addAll, this );

            if(this.credentialId) {
                var credId = this.credentialId;
                this.collection.fetch({ data: $.param({ cred_id: credId}) });
            } else {
                this.collection.fetch();
            }
            
            return this;
        },
        
        addOne: function( model ) {
            if (model.get(this.modelStringIdentifier) === "") {
                return;
            }
            var view = new ResourceRowView({ model: model });
            view.columns = this.columns;
            view.render();
        },

        addAll: function() {
            this.collection.each(this.addOne, this);
            
            if(this.selectedId) {
                this.selectOne(this.selectedId, $("tr:contains("+this.selectedId+")"));
            }
        },
        
        clickOne: function (event) {
            console.log($(event.currentTarget).data());
            var id, parentNode;
            var rowData = this.$table.fnGetData(event.currentTarget);
            console.log("ROW DATA", rowData, "COLUMN NUMBER", this.idColumnNumber);
            //TODO -- make more dynamic in order to allow user to define columns
            id = rowData[this.idColumnNumber];
            Common.router.navigate("#resources/aws/"+this.type+"/"+this.subtype+"/"+id, {trigger: false});
            this.selectOne(id, event.currentTarget);
        },

        selectOne : function (id, rowNode) {
            var selectedModel;
            var modelStringIdentifier = this.modelStringIdentifier;
            this.clearSelection();
            console.log("Selecting ID:", id);
            if(rowNode) {
                $(rowNode).addClass('row_selected');
            }
            
            this.collection.each(function(e) {
                if (e.get(modelStringIdentifier) === id) {
                    selectedModel = e;
                }
            });
            
            if(selectedModel) {
                this.selectedId = id;
                
                if (ich.templates.resource_detail) {
                    $("#details").html(ich.resource_detail(selectedModel.attributes));
                    $("#detail_tabs").tabs();
                    $('.create_button').button();
                    $(".action_menu").menu({
                        position: { my: 'left top', at: 'left bottom'}
                    });
                }
            }else {
                
            }
        },
        
        clearSelection: function () {
            this.$table.$('tr').removeClass('row_selected');
            //$('#details').empty();
        },
        
        createNew : function () {
            var CreateView = this.CreateView;
            this.newResourceDialog = new CreateView();
            this.newResourceDialog.render();
        }
    });

    console.log("resource app view defined");
    
    return ResourceAppView;
});
