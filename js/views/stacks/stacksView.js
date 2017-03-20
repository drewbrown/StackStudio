/*!
 * StackStudio 2.0.0-rc.1 <http://stackstudio.transcendcomputing.com>
 * (c) 2012 Transcend Computing <http://www.transcendcomputing.com/>
 * Available under ASL2 license <http://www.apache.org/licenses/LICENSE-2.0.html>
 */
/*jshint smarttabs:true */
/*global define:true console:true requirejs:true require:true alert:true*/
define(
    [
        'common',
        'views/stacks/stackDesignView',
        'views/stacks/stackRunView',
        'views/stacks/stackCreateView',
        'collections/stacks',
        'text!templates/stacks/stacksTemplate.html'
    ],
    function(Common, StackDesignView, StackRunView, StackCreateView, Stacks, stacksTemplate) {
        var $ = Common.jquery;
        var _ = Common.underscore;
        var Backbone = Common.backbone;

        var StacksView = Backbone.View.extend({
          tagName: 'div',
          template: _.template(stacksTemplate),
          stackDesignView: undefined,
          stackRunView: undefined,
          stacks: undefined,
      
          events: {
            "click #create_stack_button": "createStack",
            "click .stack_delete": "deleteStack",
            "click .stack": "openStack"
          },
      
          initialize: function() {
            $("#main").html(this.el);
            this.stackDesignView = undefined;
            this.stackRunView = undefined;
            this.$el.html(this.template);
            this.stacks = new Stacks();
            this.stacks.on('reset', this.addAllStacks, this);
            var stackApp = this;
            Common.vent.off("stackCreated");
            Common.vent.on("stackCreated", function(newStack) {
              if (!Common.cache('stack_id')) {
                Common.cache('stack_id', newStack.stack._id);
                Common.cache('stack_name', newStack.stack.name);
                stackApp.render();
              } else {
                var confirmation = confirm("Are you sure you want to open " + newStack.stack.name + "? Any unsaved changes to " +
                  Common.cache('stack_name') + " will be lost.");
                if (confirmation === true) {
                  Common.cache('stack_id', newStack.stack._id);
                  Common.cache('stack_name', newStack.stack.name);
                }
              }
              stackApp.stacks.fetch({
                reset: true
              });
            });
            Common.vent.off("stackDeleted");
            Common.vent.on("stackDeleted", function() {
              stackApp.stacks.fetch({
                reset: true
              });
            });
            Common.vent.on('global:modeChange', this.changeMode, this);
          },
      
          render: function() {
            if (Common.cache('stack_id')) {
              $("#stack_not_opened").hide();
              $("#stack_opened").show();
              //Add event when tabs change
              $('a[data-toggle="tab"]').off('shown');
              var stacksView = this;
              $('a[data-toggle="tab"]').on('shown', function(e) {
                stacksView.changeMode("dev");
              });
              this.changeMode("dev");
            } else {
              $("#stack_opened").hide();
              $("#stack_not_opened").show();
            }
      
            this.stacks.fetch({
              reset: true
            });
          },
      
          changeMode: function(mode) {
            if (mode === "dev") {
              if (!this.stackDesignView) {
                this.stackDesignView = new StackDesignView();
              }
              this.stackDesignView.render();
              $("#tabs-design").show();
              $("#tabs-run").hide();
            } else {
              if (!this.stackRunView) {
                this.stackRunView = new StackRunView();
              }
              if (Common.cache('stack_id')) {
                this.stackRunView.setStack(this.stacks.get(Common.cache('stack_id')));
              }
              this.stackRunView.render();
              $("#tabs-design").hide();
              $("#tabs-run").show();
            }
          },
      
          addAllStacks: function() {
            $("#stacks_menu").empty();
            $("#stacks_delete_menu").empty();
            this.stacks.each(function(stack) {
              $("#stacks_menu").append("<li><a id='" + stack.id + "' class='stack'>" + stack.attributes.name + "</a></li>");
              $("#stacks_delete_menu").append("<li><a id='" + stack.id + "' class='stack_delete'>" + stack.attributes.name + "</a></li>");
            });
            if (Common.cache('stack_id')) {
              this.stackDesignView.setStack(this.stacks.get(Common.cache('stack_id')));
            }
          },
      
          openStack: function(event) {
            var stack = this.stacks.get(event.target.id);
            Common.cache('stack_id', stack.id);
            Common.cache('stack_name', stack.attributes.name);
            this.render();
          },
      
          createStack: function() {
            new StackCreateView();
          },
      
          deleteStack: function(event) {
            var confirmation = confirm("Are you sure you want to delete " + event.target.innerText + "?");
            if (confirmation === true) {
              var stack = this.stacks.get(event.target.id);
              if (Common.cache('stack_id') && stack.id === Common.cache('stack_id')) {
                Common.cache("stack_id", null);
                Common.cache('stack_name', null);
                this.render();
              }
              stack.destroy();
            }
          },
      
          close: function() {
            this.$el.empty();
            this.undelegateEvents();
            this.stopListening();
            this.unbind();
          }
        });
      
        var stacksView;
      
        Common.router.on('route:stacks', function() {
          if (!Common.authenticate({ redirect: 'here' })) {
            return;
          }
          if (this.previousView !== stacksView) {
            this.unloadPreviousState();
            stacksView = new StacksView();
            this.setPreviousState(stacksView);
          }
          stacksView.render();
        }, Common);
      
        return StacksView;
    }
);
