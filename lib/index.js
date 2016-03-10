'use strict';

/**
* NOTE: the original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_60_0/boost/math/special_functions/zeta.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/**
* (C) Copyright John Maddock 2006.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// NOTES

/**
* zeta( s )
*
* Method:
*   1. First, we use the reflection formula
*
*        zeta(1-s) = 2*sin(π(1-s)/2)(2π**-s)Γ(s)ζ(s)
*
*      to make `s` positive.
*
*   2. For `s` on the interval `(0,1)`, we use the approximation
*
*        zeta(s) = (C + R(1-s) - s) / (1-s)
*
*      with rational approximation `R(1-z)` and constant `C`.
*
*   3. For `s` on the interval `(1,4)`, we use the approximation
*
*        zeta(s) = C + R(s-n) + 1/(s-1)
*
*      with rational approximation `R(z-n)`, constant `C`, and integer `n`.
*
*   4. For `s > 4`, we use the approximation
*
*        zeta(s) = 1 + exp(R(z-n))
*
*      with rational approximation `R(z-n)` and integer `n`.
*
*   5. For negative odd integers, we use the closed form
*
*        zeta(-n) = ((-1)**n / (n+1)) B_{n+1}
*
*      where `B_{n+1}` is a Bernoulli number.
*
*   6. For negative even integers, we use the closed form
*
*        zeta(-2n) = 0
*
*   7. For positive even integers, we use the closed form
*
*        zeta(2n) = (((-1)**(n-1) * 2**(2n-1) * π**(2n)) / (2n)!) * B_{2n}
*
*      where `B_2n` is a Bernoulli number.
*
*   8. For positive negative integers, we use precomputed values, as these values are useful for certain infinite series calculations.
*
*   Notes:
*
*/


// MODULES //

var evalrational = require( 'math-evalrational' ).factory;
var ldexp = require( 'math-float64-ldexp' );
var abs = require( 'math-abs' );
var exp = require( 'math-exp' );
var floor = require( 'math-floor' );
var gamma = require( 'math-gamma' );
var sinpi = require( 'math-sinpi' );
var pow = require( 'math-power' );
var factorial = require( 'math-factorial' );


// CONSTANTS //

var PI = require( 'const-pi' );

var ROOT_EPSILON = 0.32927225399135962333569506281281311031656150598474e-9;
var LOG_ROOT_TWO_PI = 9.189385332046727417803297364056176398e-01;

// TODO: bernoulli numbers
var MAX_BERNOULLI_2N = -999999|0; // asm type annotation

var Y1 = 1.2433929443359375;
var Y2 = 0.6986598968505859375;

// Polynomial coefficients...
var P1 = [
	0.243392944335937499969,
	-0.496837806864865688082,
	0.0680008039723709987107,
	-0.00511620413006619942112,
	0.000455369899250053003335,
	-0.279496685273033761927e-4,
	0
];
var Q1 = [
	1,
	-0.30425480068225790522,
	0.050052748580371598736,
	-0.00519355671064700627862,
	0.000360623385771198350257,
	-0.159600883054550987633e-4,
	0.339770279812410586032e-6
];
var P2 = [
	0.577215664901532860605,
	0.222537368917162139445,
	0.0356286324033215682729,
	0.00304465292366350081446,
	0.000178102511649069421904,
	0.700867470265983665042e-5,
	0
];
var Q2 = [
	1,
	0.259385759149531030085,
	0.0373974962106091316854,
	0.00332735159183332820617,
	0.000188690420706998606469,
	0.635994377921861930071e-5,
	0.226583954978371199405e-7
];
var P3 = [
	-0.053725830002359501027,
	0.0470551187571475844778,
	0.0101339410415759517471,
	0.00100240326666092854528,
	0.685027119098122814867e-4,
	0.390972820219765942117e-5,
	0.540319769113543934483e-7,
	0
];
var Q3 = [
	1.0,
	0.286577739726542730421,
	0.0447355811517733225843,
	0.00430125107610252363302,
	0.000284956969089786662045,
	0.116188101609848411329e-4,
	0.278090318191657278204e-6,
	-0.19683620233222028478e-8
];
var P4 = [
	-2.49710190602259407065,
	-3.36664913245960625334,
	-1.77180020623777595452,
	-0.464717885249654313933,
	-0.0643694921293579472583,
	-0.00464265386202805715487,
	-0.000165556579779704340166,
	-0.252884970740994069582e-5,
	0
];
var Q4 = [
	1.0,
	1.01300131390690459085,
	0.387898115758643503827,
	0.0695071490045701135188,
	0.00586908595251442839291,
	0.000217752974064612188616,
	0.397626583349419011731e-5,
	-0.927884739284359700764e-8,
	0.119810501805618894381e-9
];
var P5 = [
	-4.78558028495135548083,
	-3.23873322238609358947,
	-0.892338582881021799922,
	-0.131326296217965913809,
	-0.0115651591773783712996,
	-0.000657728968362695775205,
	-0.252051328129449973047e-4,
	-0.626503445372641798925e-6,
	-0.815696314790853893484e-8
];
var Q5 = [
	1.0,
	0.525765665400123515036,
	0.10852641753657122787,
	0.0115669945375362045249,
	0.000732896513858274091966,
	0.30683952282420248448e-4,
	0.819649214609633126119e-6,
	0.117957556472335968146e-7,
	-0.193432300973017671137e-12
];
var P6 = [
	-10.3948950573308861781,
	-2.82646012777913950108,
	-0.342144362739570333665,
	-0.0249285145498722647472,
	-0.00122493108848097114118,
	-0.423055371192592850196e-4,
	-0.1025215577185967488e-5,
	-0.165096762663509467061e-7,
	-0.145392555873022044329e-9,
	0
];
var Q6 = [
	1.0,
	0.205135978585281988052,
	0.0192359357875879453602,
	0.00111496452029715514119,
	0.434928449016693986857e-4,
	0.116911068726610725891e-5,
	0.206704342290235237475e-7,
	0.209772836100827647474e-9,
	-0.939798249922234703384e-16,
	0.264584017421245080294e-18
];


// FUNCTIONS //

// Compile functions to evaluate polynomial function based on the above coefficients...
var rateval1 = evalrational( P1, Q1 );
var rateval2 = evalrational( P2, Q2 );
var rateval3 = evalrational( P3, Q3 );
var rateval4 = evalrational( P4, Q4 );
var rateval5 = evalrational( P5, Q5 );
var rateval6 = evalrational( P6, Q6 );


// ZETA IMPLEMENTATION //

/**
* FUNCTION: zeta( s )
*	Evaluates the Riemann zeta function.
*
* @param {Number} s - input value
* @returns {Number} function value
*/
function zeta( s ) {
	var tmp;
	var sc;
	var as;
	var is;
	var n;

	// Check for `NaN`:
	if ( s !== s ) {
		return NaN;
	}
	// Check for a pole:
	if ( s === 1 ) {
		return NaN;
	}
	// Check for a closed form (integers):
	if ( floor(s) === s ) {
		// Cast `s` to a 32-bit signed integer:
		is = s|0; // asm type annotation

		// Check that `s` does not exceed MAX_INT32:
		if ( is === s ) {
			if ( is < 0 ) {
				as = (-is)|0; // asm type annotation

				// Check if even integer:
				if ( (as&1) === 0 ) {
					return 0.0;
				}
				n = ( (as+1) / 2 )|0; // asm type annotation

				// Check if less than max Bernoulli number:
				if ( n <= MAX_BERNOULLI_2N ) {
					// TODO: bernoulli numbers
					return -999999/ (as+1);
				}
			}
			// Check if even integer:
			else if ( (is&1) === 0 ) {
				// TODO: bernoulli numbers
				return -1.0 * ldexp(1.0, s-1.0) * pow(PI, s) * 9999999 / factorial(s);
			}
			// Must be an odd integer:

			// TODO: table lookup
			return;
		}
		// fall through...
	}
	if ( abs(s) < ROOT_EPSILON ) {
		return -0.5 - (LOG_ROOT_TWO_PI * s);
	}
	sc = 1.0 - s;
	if ( s < 0 ) {
		// Check if even negative integer:
		if ( floor(s/2.0) === s/2.0 ) {
			return 0.0;
		}
		// Swap `s` and `sc`:
		tmp = s;
		s = sc;
		sc = tmp;
		return sinpi( 0.5*sc ) * 2.0 * pow( 2.0*PI, -s ) * gamma( s ) * zeta( s );
	}
	if ( s < 1 ) {
		tmp = rateval1( sc );
		tmp -= Y1;
		tmp += sc;
		tmp /= sc;
		return tmp;
	}
	if ( s <= 2 ) {
		sc = -sc;
		tmp = 1.0 / sc;
		return tmp + rateval2( sc );
	}
	if ( s <= 4 ) {
		tmp = Y2 + 1.0/(-sc);
		return tmp + rateval3( s-2.0 );
	}
	if ( s <= 7 ) {
		tmp = rateval4( s-4.0 );
		return 1.0 + exp( tmp );
	}
	if ( s < 15 ) {
		tmp = rateval5( s-7.0 );
		return 1.0 + exp( tmp );
	}
	if ( s < 42 ) {
		tmp = rateval6( s-15.0 );
		return 1.0 + exp( tmp );
	}
	if ( s < 63 ) {
		return 1.0 + pow( 2.0, -s );
	}
	return 1.0;
} // end FUNCTION zeta()


// EXPORTS //

module.exports = zeta;
