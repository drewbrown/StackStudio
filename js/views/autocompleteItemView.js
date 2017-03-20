/*!
 * StackStudio 2.0.0-rc.1 <http://stackstudio.transcendcomputing.com>
 * (c) 2012 Transcend Computing <http://www.transcendcomputing.com/>
 * Available under ASL2 license <http://www.apache.org/licenses/LICENSE-2.0.html>
 */
/*jshint smarttabs:true */
/*global define:true console:true */
define(
    ['common'],
    function(Common) {
        var $ = Common.jquery;
        var _ = Common.underscore;
        var Backbone = Common.backbone;
        var ace = Common.ace;

        var AutocompleteItemView = Backbone.View.extend({
            id: "autocomplete",
            tagName: "input",
            
            events: {
                //'click': 'selectItem'
            },
            
            render: function() {
              var values = [
                { label: "t1.micro", category: "" },
                { label: "m1.small", category: "" },
                { label: "m1.medium", category: "" },
                { label: "m1.large", category: "" },
                { label: "InstanceType", category: "Parameters", value: '{"Ref": "InstanceType"}'},
                { label: "TypeMapping", category: "Mappings", value: '{"Fn::FindInMap" : [ "MyMap", "MapKey", "MapValue"]}'}
              ];
              $.widget( "custom.catcomplete", $.ui.autocomplete, {
                  _renderMenu: function( ul, items ) {
                      var that = this,
                      currentCategory = "";
                      $.each( items, function( index, item ) {
                          if ( item.category !== currentCategory ) {
                              ul.append( "<li class='ui-autocomplete-category'>" + item.category + "</li>" );
                              currentCategory = item.category;
                          }
                          that._renderItemData( ul, item );
                      });
                  }
              });
              
              this.$el.catcomplete({
                  source: values,
                  autoFocus: true,
                  select: this.handleSelect,
                  delay: 0
              });
              
              this.$el.focusout(this.focusOut);
              return this;  
            },
            
            handleSelect: function( event, ui ) {
                $(".ace_autocomplete").remove();
                $("#autocomplete").remove();
                $("#autocomplete_container").remove();
                var editor = ace.edit("design_editor");
                var range = editor.getSelectionRange();
                var selectedValue = ui.item.value;
                editor.session.replace(range, selectedValue);
            },
            
            focusOut: function() {
                $(".ace_autocomplete").remove();
                $("#autocomplete").remove();
                $("#autocomplete_container").remove();
            }
        });
    
        return AutocompleteItemView;
    }
);
