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

;; Functions

;; Register a new university
(define-public (register-university (university principal))
  (begin
    (asserts! (is-eq tx-sender contract-owner) err-owner-only)
    (asserts! (is-none (map-get? Universities university)) err-already-exists)
    (ok (map-set Universities university true))))

 ;; Issue a new degree
 (define-public (issue-degree (recipient principal) (metadata (string-ascii 256)))
   (let
     ((university tx-sender)
      (degree-id (var-get next-degree-id)))
     (asserts! (is-some (map-get? Universities university)) err-not-found)
     (try! (nft-mint? Degree degree-id recipient))
     (map-set Degrees degree-id {university: university, recipient: recipient, metadata: metadata})
     (map-set UniversityDegrees
              university
              (unwrap-panic (as-max-len?
                (append (default-to (list) (map-get? UniversityDegrees university)) degree-id)
                u100)))
     (var-set next-degree-id (+ degree-id u1))
     (ok degree-id)))

;; Get degree details
(define-read-only (get-degree-details (degree-id uint))
  (map-get? Degrees degree-id))

;; Get all degrees issued by a university
(define-read-only (get-university-degrees (university principal))
  (map-get? UniversityDegrees university))
