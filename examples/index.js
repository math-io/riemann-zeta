'use strict';

var linspace = require( 'compute-linspace' );
var zeta = require( './../lib' );

var x = linspace( -50, 50, 200 );
var v;
var i;

for ( i = 0; i < x.length; i++ ) {
	v = zeta( x[ i ] );
	console.log( 'x: %d, f(x): %d', x[ i ], v );
}
