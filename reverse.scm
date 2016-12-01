(define (reverse item)
	(define (iter-reverse remain-item result)
		(if (null? remain-item)
			result
			(iter-reverse (cdr remain-item) (cons (car remain-item) result))))
	(iter-reverse item '()))



(define (deep-reverse item))