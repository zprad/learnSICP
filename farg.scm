(define hello
	(lambda (name)
		(string-append "Hello " name "!")))

(define sum3
	(lambda (a b c)
		(+ a b c)))

(define (add a)
	(+ a 1))

(define (minus a)
	(- a 1))

(define pi (* 4 (atan 1.0)))

(define (radian deg)
	(/ (* pi deg) 180))

(define (shift v t)
	(* v t))

(define (flyTime v)
	(* 2 (/ v 9.8)))

(define (flydistance v theta)
	(* 
		(* v (cos (radian theta)))
		(flyTime (* v (sin (radian theta))))
		))


