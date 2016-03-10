'use strict';

// MODULES //

var tape = require( 'tape' );
var abs = require( 'math-abs' );
var zeta = require( './../lib' );
var linspace = require( 'compute-linspace' );


// FIXTURES //

var output = JSON.parse( require( './fixtures/output.json' ).program_message );
var data = output.x;
var expected = output.expected;


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.equal( typeof zeta, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `NaN`, the function returns `NaN`', function test( t ) {
	var v = zeta( NaN );
	t.ok( v !== v, 'returns NaN when provided a NaN' );
	t.end();
});

tape( 'the function evaluates the Riemann zeta function', function test( t ) {
	var delta;
	var tol;
	var v;
	var i;

	for ( i = 0; i < data.length; i++ ) {
		v = zeta( data[ i ] );
		delta = abs( v - expected[ i ] );
		tol = 1e-14 * Math.max( 1, abs( v ), abs( expected[ i ]) );
		t.ok( delta <= tol, 'within tolerance. x: ' + data[ i ] + '. Value: ' + v + '. Expected: ' + expected[ i ] + '. Tolerance: ' + tol + '.' );
	}
	t.end();
});

tape( 'the function evaluates the Riemann zeta function for very small values', function test( t ) {
	var v = zeta( 1e-10 );
	t.equal( v, -0.5000000000918938 );
	t.end();
});

tape( 'if evaluated at pole `1`, the function returns `NaN`', function test( t ) {
	var v = zeta( 1 );
	t.ok( v !== v, 'returns NaN when provided 1' );
	t.end();
});

tape( 'the function evaluates returns `1` for input values greater or equal than `63`', function test( t ) {
	var s = linspace( 63, 100, 200 );
	var v;
	var i;
	for ( i = 0; i < s.length; i++ ) {
		v = zeta( s[ i ] );
		t.equal( v, 1, 'returns 1 when provided '+s[i] );
	}
	t.end();
});
