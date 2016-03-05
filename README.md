Riemann Zeta Function
===
[![NPM version][npm-image]][npm-url] [![Build Status][build-image]][build-url] [![Coverage Status][coverage-image]][coverage-url] [![Dependencies][dependencies-image]][dependencies-url]

> Riemann [Zeta][zeta-function] function.

The [Zeta][zeta-function] function evaluated at `s` is

<div class="equation" align="center" data-raw-text="\zeta(s) =\sum_{k=1}^\infty\frac{1}{k^s}" data-equation="">
	<img src="https://cdn.rawgit.com/math-io/zeta/faeb230ec3e8dba0e1011b5ddfe219c784e98c67/docs/img/eqn.svg" alt="Infinite series for zeta function">
	<br>
</div>

## Installation

``` bash
$ npm install math-zeta
```


## Usage

``` javascript
var zeta = require( 'math-zeta' );
```


#### zeta( x )

Evaluates the Riemann [zeta function][zeta-function].

``` javascript
var val = zeta( 1.1 );
// returns ~10.584

val = zeta( -4 );
// returns 0

val = zeta( 70 );
// returns 1

val = zeta( 0.5 );
// returns ~-1.46
```


## Examples

``` javascript
var linspace = require( 'compute-linspace' );
var zeta = require( 'math-zeta' );

var x = linspace( -50, 50, 200 );
var v;
var i;

for ( i = 0; i < x.length; i++ ) {
	v = zeta( x[ i ] );
	console.log( 'x: %d, f(x): %d', x[ i ], v );
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


[npm-image]: http://img.shields.io/npm/v/math-zeta.svg
[npm-url]: https://npmjs.org/package/math-zeta

[build-image]: http://img.shields.io/travis/math-io/zeta/master.svg
[build-url]: https://travis-ci.org/math-io/zeta

[coverage-image]: https://img.shields.io/codecov/c/github/math-io/zeta/master.svg
[coverage-url]: https://codecov.io/github/math-io/zeta?branch=master

[dependencies-image]: http://img.shields.io/david/math-io/zeta.svg
[dependencies-url]: https://david-dm.org/math-io/zeta

[dev-dependencies-image]: http://img.shields.io/david/dev/math-io/zeta.svg
[dev-dependencies-url]: https://david-dm.org/dev/math-io/zeta

[github-issues-image]: http://img.shields.io/github/issues/math-io/zeta.svg
[github-issues-url]: https://github.com/math-io/zeta/issues

[tape]: https://github.com/substack/tape
[istanbul]: https://github.com/gotwarlost/istanbul
[testling]: https://ci.testling.com

[compute-io]: https://github.com/compute-io/
[zeta-function]: https://en.wikipedia.org/wiki/Riemann_zeta_function
