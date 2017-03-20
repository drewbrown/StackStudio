/*!
 * StackStudio 2.0.0-rc.1 <http://stackstudio.transcendcomputing.com>
 * (c) 2012 Transcend Computing <http://www.transcendcomputing.com/>
 * Available under ASL2 license <http://www.apache.org/licenses/LICENSE-2.0.html>
 */
/*jshint smarttabs:true */
/*global define:true console:true alert:true*/
define([
        'jquery',
        'backbone',
        'models/portfolio',
        'common'
], function( $, Backbone, Portfolio, Common) {
	'use strict';

	var PortfolioList = Backbone.Collection.extend({

		model: Portfolio,

        url: function(options){return Common.apiUrl + '/stackstudio/v1/portfolios/org/' + Common.account.org_id;}
	
	});

	return PortfolioList;

});
