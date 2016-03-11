'use strict';

// MODULES //

var tape = require( 'tape' );
var abs = require( 'math-abs' );
var linspace = require( 'compute-linspace' );
var PINF = require( 'const-pinf-float64' );
var EPS = require( 'const-eps-float64' );
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
		tol = (31*EPS) * Math.max( 1, abs( v ), abs( expected[ i ]) );
		t.ok( delta <= tol, 'within tolerance. s: ' + s[i] + '. v: ' + v + '. E: ' + expected[i] + '. Δ: ' + delta + '. Tol: ' + tol + '.' );
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

tape( 'if provided `0` (special value), the function returns `-0.5`', function test( t ) {
	var v = zeta( 0 );
	t.equal( v, -0.5, 'returns -0.5' );
	t.end();
});

tape( 'if provided `-1` (special value), the function returns `-1/12`', function test( t ) {
	var v = zeta( -1 );
	t.equal( v, -1/12, 'returns -1/12' );
	t.end();
});

tape( 'if provided `-13` (special value), the function returns `-1/12`', function test( t ) {
	var v = zeta( -13 );
	t.equal( v, -1/12, 'returns -1/12' );
	t.end();
});

tape( 'if provided `4` (special value), the function returns `~1.0823`', function test( t ) {
	var v = zeta( 4 );

	// https://oeis.org/A0013662
	t.equal( v, 1.082323233711138191516003696541167, 'returns ~1.0823' );
	t.end();
});

tape( 'if provided `3` (special value), the function returns `~1.202`', function test( t ) {
	var v = zeta( 3 );

	// https://oeis.org/A002117
	t.equal( v, 1.2020569031595942853997, 'returns ~1.202' );
	t.end();
});

tape( 'if provided `2` (special value), the function returns `~1.645`', function test( t ) {
	var v = zeta( 2 );

	// https://oeis.org/A013661
	t.equal( v, 1.6449340668482264364724151666460251892189499012067984377355582293700074704032, 'returns ~1.645' );
	t.end();
});

tape( 'if provided `3/2` (special value), the function returns `~2.612`', function test( t ) {
	var v = zeta( 3/2 );

	// https://oeis.org/A078434
	t.equal( v, 2.61237534868548834334856756792407163057080065240006340757332824881492776768827286099624386812631195238297, 'returns ~2.612' );
	t.end();
});

tape( 'if provided `1/2` (special value), the function returns `~-1.46`', function test( t ) {
	var v = zeta( 1/2 );

	// https://oeis.org/A059750
	t.equal( v, -1.4603545088095868128894991525152980124672293310125814905428860878, 'returns ~-1.46' );
	t.end();
});
