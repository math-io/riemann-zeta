TODO
====

1. Improve accuracy of required modules:
	* the test tolerance when testing against Boost is `34*eps` which is approx `7.55e-15`, which is not terrible, but could be better. The main culprit for pushing the tolerance up are values between `-31` and `-32`. Could possibly be linked to an accumulation of errors from `sinpi`, `gamma`, or `pow`.
	* for negative non-integer values on the interval `(-170,-259)`, the approximation used deteriorates compared to Wolfram Alpha results => from `1e-14` to `7e-14`. This may be partially due to an accumulation of errors in `sinpi`, `gammaln`, `ln`, `exp`, and recursive use of `zeta`.  
