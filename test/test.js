'use strict';

// MODULES //

var tape = require( 'tape' );
var abs = require( 'math-abs' );
var linspace = require( 'compute-linspace' );
var PINF = require( 'const-pinf-float64' );
var zeta = require( './../lib' );


// FIXTURES //

var data = require( './fixtures/output.json' ).program_message;
data = JSON.parse( data );


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
	var expected;
	var delta;
	var tol;
	var s;
	var v;
	var i;

	s = data.x;
	expected = data.expected;
	for ( i = 0; i < s.length; i++ ) {
		v = zeta( s[ i ] );
		delta = abs( v - expected[ i ] );
		tol = 1e-14 * Math.max( 1, abs( v ), abs( expected[ i ]) );
		t.ok( delta <= tol, 'within tolerance. s: ' + s[i] + '. Value: ' + v + '. Expected: ' + expected[i] + '. Tolerance: ' + tol + '.' );
	}
	t.end();
});

tape( 'the function evaluates the Riemann zeta function for very small values', function test( t ) {
	var v = zeta( 1e-10 );

	// Checked against Julia:
	t.equal( v, -0.5000000000918938 );

	t.end();
});

tape( 'if evaluated at a pole (`s = 1`), the function returns `NaN`', function test( t ) {
	var v = zeta( 1.0 );
	t.ok( v !== v, 'returns NaN when provided 1' );
	t.end();
});

tape( 'the function evaluates returns `1` for all input values greater or equal than `63`', function test( t ) {
	var s;
	var v;
	var i;

	s = linspace( 63, 100, 200 );
	for ( i = 0; i < s.length; i++ ) {
		v = zeta( s[ i ] );
		t.equal( v, 1, 'returns 1 when provided '+s[i] );
	}
	v = zeta( PINF );
	t.equal( v, 1, 'returns 1 when provided +infinity' );

	t.end();
});
