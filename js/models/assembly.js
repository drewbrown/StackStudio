/*!
 * StackStudio 2.0.0-rc.1 <http://stackstudio.transcendcomputing.com>
 * (c) 2012 Transcend Computing <http://www.transcendcomputing.com/>
 * Available under ASL2 license <http://www.apache.org/licenses/LICENSE-2.0.html>
 */
/*jshint smarttabs:true */
/*global define:true console:true */
define([
        'jquery',
        'backbone',
        'common'
], function( $, Backbone, Common ) {
    'use strict';

    // App Model
    // ----------

    /**
     *
     * @name Assembly
     * @constructor
     * @param {Object} initialization object.
     * @returns {Object} Returns a Assembly instance.
     */
    var Assembly = Backbone.Model.extend({

        /** Default attributes for the project */
        idAttribute: "_id",
        defaults: {
            name: '',
            configurations: {}
        },
        url: function(){
            return Backbone.Model.prototype.url.apply(this, arguments) + "?account_id="+ Common.account.id;
        }

    });

    return Assembly;
});
