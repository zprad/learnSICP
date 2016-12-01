(define (make-account balance)
	(define (withdraw amount)
		(if (>= balance amount)
			(begin (set! balance (- balance amount))
				balance)
			"Insufficient funds"))
	(define (deposit amount)
		(set! balance (+ balance amount))
		balance)
	(define (dispatch m)
		(cond ((eq? m 'withdraw) withdraw)
			((eq? m 'deposit) deposit)
			(else (error "Unknown request: MAKE-ACCOUNT"
				m))))
	dispatch)

(define acc (make-account 100))

(define (cons a b)
	(* (expt 2 a)
		(expt 3 b)))

(define (car z)
    (if (= 0 (remainder z 2))
        (+ 1 (car (/ z 2)))
        0))

(define (cdr z)
    (if (= 0 (remainder z 3))
        (+ 1 (cdr (/ z 3)))
        0))

(define (add-1 n)
	(lambda (f) (lambda (x) (f ((n f) x)))))