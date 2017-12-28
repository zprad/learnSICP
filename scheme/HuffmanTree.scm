
;叶节点的表示
(define (make-leaf symbol weight) (list 'leaf symbol weight))
(define (leaf? object) (eq? (car object) 'leaf))
(define (symbol-leaf x) (cadr x))
(define (weight-leaf x) (caddr x))

;HuffmanTree的表示
(define (make-code-tree left right)
    (list left
          right
          (append (symbols left) (symbols right))
          (+ (weight left) (weight right))))
(define (left-branch tree) (car tree))
(define (right-branch tree) (cadr tree))
(define (symbols tree)
    (if (leaf? tree)
        (list (symbol-leaf tree))
        (caddr tree)))
(define (weight tree)
    (if (leaf? tree)
        (weight-leaf tree)
        (cadddr tree)))

;HuffmanTre的解码过程
(define (decode bits tree)
    (define (decode-1 bits current-branch)
        (if (null? bits)
            '()
            (let ((next-branch
                    (choose-branch (car bits) current-branch)))
                (if (leaf? next-branch)
                    (cons (symbol-leaf next-branch)
                          (decode-1 (cdr bits) tree))
                    (decode-1 (cdr bits) next-branch)))))
    (decode-1 bits tree))
(define (choose-branch bit branch)
    (cond ((= bit '0) (left-branch branch))
          ((= bit '1) (right-branch branch))
          (else (error "bad bit: CHOOSE-BRANCH" bit))))

;测试样例
(define sample-tree
  (make-code-tree (make-leaf 'A 4)
                  (make-code-tree
                    (make-leaf 'B 2)
                    (make-code-tree
                      (make-leaf 'D 1)
                      (make-leaf 'C 1)))))
(define sample-message '(0 1 1 0 0 1 0 1 0 1 1 1 0))

(define (encode message tree)
  (if (null? message)
      '()
      (append (encode-symbol (car message) tree)
              (encode (cdr message) tree))))
(define (encode-symbol symbol tree)
  (if (null? tree)
      '()
      (if (eq? symbol (symbol-leaf (left-branch tree)))
          (list '0)
          (encode-symbol-right symbol (right-branch tree)))))

(define (encode-symbol-right symbol tree)
  (if (leaf? tree)
      (if (eq? symbol (symbol-leaf tree))
          (list '1)
          (error "bad symbol:ebcode-symbol-right" symbol))
      (append (list '1) (encode-symbol symbol tree))))
