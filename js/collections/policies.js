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
        'models/policy',
        'common'
], function( $, Backbone, Policy, Common ) {
    'use strict';

    var PolicyList = Backbone.Collection.extend({

        model: Policy,

        url: Common.apiUrl + '/identity/v1/policies'
        
    });
    
    return PolicyList;

});
