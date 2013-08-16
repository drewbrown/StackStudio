/*!
 * StackStudio 2.0.0-rc.1 <http://stackstudio.transcendcomputing.com>
 * (c) 2012 Transcend Computing <http://www.transcendcomputing.com/>
 * Available under ASL2 license <http://www.apache.org/licenses/LICENSE-2.0.html>
 */
/*jshint smarttabs:true */
/*global define:true console:true */
define([
        'jquery',
        'backbone'
], function( $, Backbone ) {
    'use strict';

    var Country = Backbone.Model.extend({

        /** Default attributes for country */
        defaults: {
            code: '',
            name: ''
        },
        
        parse: function(resp) {
            return resp.country;
        }
    });

    return Country;
});
