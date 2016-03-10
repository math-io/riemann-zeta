Riemann Zeta Function
===
[![NPM version][npm-image]][npm-url] [![Build Status][build-image]][build-url] [![Coverage Status][coverage-image]][coverage-url] [![Dependencies][dependencies-image]][dependencies-url]

> [Riemann zeta][zeta-function] function.

The [Riemann zeta][zeta-function] function is the [analytic continuation][analytical-continuation] of the infinite series 

<div class="equation" align="center" data-raw-text="\zeta(s) =\sum_{k=1}^\infty\frac{1}{k^s}" data-equation="eq:riemann_zeta_function">
	<img src="https://cdn.rawgit.com/math-io/riemann-zeta/faeb230ec3e8dba0e1011b5ddfe219c784e98c67/docs/img/eqn.svg" alt="Riemann zeta function">
	<br>
</div>

where `s` is a complex variable equal to `σ + ti`. The series is only convergent when the real part of `s`, `σ`, is greater than `1`.


## Installation

``` bash
$ npm install math-riemann-zeta
```


## Usage

``` javascript
var zeta = require( 'math-riemann-zeta' );
```


#### zeta( s )

Evaluates the [Riemann zeta][zeta-function] function.

``` javascript
var v = zeta( 1.1 );
// returns ~10.584

v = zeta( -4 );
// returns 0

v = zeta( 70 );
// returns 1

v = zeta( 0.5 );
// returns ~-1.46

v = zeta( 1.0 );
// returns NaN

v = zeta( NaN );
// returns NaN
```


## Examples

``` javascript
var linspace = require( 'compute-linspace' );
var zeta = require( 'math-riemann-zeta' );

var s = linspace( -50, 50, 200 );
var v;
var i;

for ( i = 0; i < s.length; i++ ) {
	v = zeta( s[ i ] );
	console.log( 's: %d, ζ(s): %d', s[ i ], v );
}
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


---
## Tests

### Unit

This repository uses [tape][tape] for unit tests. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul][istanbul] as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


### Browser Support

This repository uses [Testling][testling] for browser testing. To run the tests in a (headless) local web browser, execute the following command in the top-level application directory:

``` bash
$ make test-browsers
```

To view the tests in a local web browser,

``` bash
$ make view-browser-tests
```

<!-- [![browser support][browsers-image]][browsers-url] -->


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2016. The [Compute.io][compute-io] Authors.


[npm-image]: http://img.shields.io/npm/v/math-riemann-zeta.svg
[npm-url]: https://npmjs.org/package/math-riemann-zeta

[build-image]: http://img.shields.io/travis/math-io/riemann-zeta/master.svg
[build-url]: https://travis-ci.org/math-io/riemann-zeta

[coverage-image]: https://img.shields.io/codecov/c/github/math-io/riemann-zeta/master.svg
[coverage-url]: https://codecov.io/github/math-io/riemann-zeta?branch=master

[dependencies-image]: http://img.shields.io/david/math-io/riemann-zeta.svg
[dependencies-url]: https://david-dm.org/math-io/riemann-zeta

[dev-dependencies-image]: http://img.shields.io/david/dev/math-io/riemann-zeta.svg
[dev-dependencies-url]: https://david-dm.org/dev/math-io/riemann-zeta

[github-issues-image]: http://img.shields.io/github/issues/math-io/riemann-zeta.svg
[github-issues-url]: https://github.com/math-io/riemann-zeta/issues

[tape]: https://github.com/substack/tape
[istanbul]: https://github.com/gotwarlost/istanbul
[testling]: https://ci.testling.com

[compute-io]: https://github.com/compute-io/
[zeta-function]: https://en.wikipedia.org/wiki/Riemann_zeta_function
[analytic-continuation]: https://en.wikipedia.org/wiki/Analytic_continuation
