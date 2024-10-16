;; university-degree-contract

;; Constants
(define-constant contract-owner tx-sender)
(define-constant err-owner-only (err u100))
(define-constant err-not-found (err u101))
(define-constant err-already-exists (err u102))

;; Data vars
(define-data-var next-degree-id uint u0)

;; Maps
(define-map Universities principal bool)
(define-map Degrees uint {university: principal, recipient: principal, metadata: (string-ascii 256)})
(define-map UniversityDegrees principal (list 100 uint))

;; NFT definitions
(define-non-fungible-token Degree uint)
