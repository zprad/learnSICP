(define (good-enough? guess x)
	(< (abs (- (* guess guess) x)) 0.001))

(define (improve guess x)
	(/ (+ guess
		  (/ x guess))
	   2))

(define (sqrt-iter guess x)
	(if (good-enough? guess x)
		guess
		(sqrt-iter (improve guess x) x)))
;求平方根函数，求太小或者太大的数不行，请进一步优化
(define (sqrt x)
	(sqrt-iter 1.0 x))

(define (new-if predicate then-clause else-clause)
	(cond (predicate then-clause)
		  (else else-clause)))
;Ackermann's function
(define (A x y)
	(cond ((= y 0) 0)
		  ((= x 0) (* 2 y))
		  ((= y 1) 2)
		  (else (A (- x 1) (A x (- y 1))))))

;换钱种类函数
(define (count-change amount) (cc amount 5))

(define (cc amount kinds-of-coins)
(cond ((= amount 0) 1)
((or (< amount 0) (= kinds-of-coins 0)) 0)
(else (+ (cc amount
(- kinds-of-coins 1))
(cc (- amount
(first-denomination
kinds-of-coins))
kinds-of-coins)))))

(define (first-denomination kinds-of-coins)
(cond ((= kinds-of-coins 1) 1)
((= kinds-of-coins 2) 5)
((= kinds-of-coins 3) 10)
((= kinds-of-coins 4) 25)
((= kinds-of-coins 5) 50)))

;Pascal's triangle
(define (Pascal-triangle x y)
	(cond ((> y x) 0)
		  ((= y x) 1)
		  ((or (= x 0) (= y 0)) 0)
		  (else (+ (Pascal-triangle (- x 1) (- y 1)) (Pascal-triangle (- x 1) y)))))