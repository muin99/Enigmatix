# Cryptography and post-quantum implementation plan

Status: design requirements, not an implementation specification. Protocol selection and expert review block production release.

## Simplify the product model

Expose reviewed, versioned security profiles, not raw algorithm switches. Establish one safe default after feasibility review. Optional passphrase mode must be clearly separate from verified device-key sessions. Drop the original five-profile shopping menu; a label such as High-Assurance requires evidence from a complete evaluated system.

## Candidate profiles

| Profile | Intended construction | Limitation / gate |
|---|---|---|
| Offline passphrase | Argon2id → domain-separated derivation → approved AEAD | Weak phrases allow offline guesses; no inherent sender identity, forward secrecy, or post-compromise recovery |
| Verified contact session | Reviewed authenticated asynchronous handshake and ratchet | Exact protocol/library, identity binding, replay behavior, and state storage must be specified |
| Hybrid PQ session | Reviewed classical + ML-KEM handshake and appropriate ongoing ratchet | Not production-ready merely because the primitives are standardized |

Do not implement AES, Argon2id, X25519, ML-KEM, ML-DSA, or hybrid combiners from scratch. Shortlist maintained native libraries after checking exact supported protocol versions, licensing, intended third-party use, audit scope, side-channel posture, and mobile targets. No dependency is selected by these documents.

## Post-quantum strategy

NIST FIPS 203 standardizes ML-KEM, FIPS 204 ML-DSA, and FIPS 205 SLH-DSA. These serve different roles. ML-KEM establishes a shared secret, not bulk encryption or sender authentication. AES-256-GCM is a candidate bulk AEAD; XChaCha20-Poly1305 is an alternative only within a reviewed suite. Use the exact nonce/key rules of the selected construction. Conformance to a standard is not FIPS module validation or proof that our app is secure.

Evaluate ML-KEM-768 as a performance/security candidate; ML-KEM-1024 is not a marketing upgrade or automatic user-selectable tier. Use a reviewed hybrid combiner with transcript and identity/context binding; do not concatenate secrets and invent KDF labels. Review classical and PQ authentication separately. ML-DSA signatures cannot simply be bolted onto a handshake without analyzing identity binding, deniability, replay, and compatibility.

Signal PQXDH and the Double Ratchet / Sparse Post-Quantum Ratchet / Triple Ratchet specifications are protocol research inputs, not permission to improvise a variation. The referenced PQXDH revision explicitly retains classical mutual authentication and does not cover active quantum attackers. State exact guarantees of the selected revision. Classical forward secrecy, PQ forward secrecy, and PQ post-compromise recovery are separate claims. A one-time PQ handshake does not establish all of them.

Track standards errata, library advisories, and protocol revisions. NIST's FIPS 203 page currently includes a potential-update notice. Pin exact evaluated versions and review changes before upgrades. Never advertise quantum proof security. Appropriate interim wording: post-quantum-ready architecture; hybrid PQ support remains gated on implementation and independent review.

## Passphrase requirements

Offer generated random multiword phrases, warn against reuse and predictable user phrases, and never send phrases to the backend. Argon2id parameters require device benchmarks and a documented minimum supported profile; no silently reduced work factor on low-memory devices. RFC 9106 provides reference choices/test vectors, but mobile extension budgets need measurement. Use an independent random salt of at least 128 bits; encode the approved parameter set. Reject excessive attacker-supplied memory/iteration settings before allocating to prevent denial of service.

A passphrase can unlock a local encrypted vault without being a peer identity. An optional additional peer factor needs a reviewed PAKE or multifactor protocol; do not hash a phrase into an existing handshake arbitrarily. Wrong phrase and tampering errors should not leak unnecessary distinctions. Server rate limits cannot stop offline guesses against captured ciphertext.

## Identity and key lifecycle

Generate device identities locally using OS randomness. Pair QR codes over a trusted physical/out-of-band channel and bind protocol suite, device identity, public keys, and version. Display trust state clearly; matching a directory entry alone does not establish a real person's identity. Block sensitive sends on unexpected key changes until explicit re-verification. A password-reset or billing admin cannot authorize replacement identity keys.

For asynchronous sessions define signed/one-time prekey publication, atomic consumption, depletion, rotation, expiry, and duplicate handling. Bound skipped-message key caches. Advance ratchet state and persist ciphertext atomically to avoid nonce/key reuse after crashes. Serialize concurrent session mutation. Restoring snapshots or cloning devices must not reuse counters or session keys; create fresh sessions on recovery where required. Multi-device enrollment and device revocation need a reviewed protocol, not shared private-key copies.

Encrypt user-controlled recovery exports using a high-entropy recovery secret or approved passphrase scheme. Verify restore and key-version migration; disclose that loss of every key/export is irreversible. Backing up old message keys may compromise forward secrecy. Do not promise secure deletion on flash or garbage-collected runtimes.

## Envelope requirements

Use a documented transport prefix and deterministic bounded serialization, such as a reviewed CBOR-based format with Base64url text encoding. This is not yet a wire spec. Freeze the format only after protocol selection and interoperability tests. Never execute arbitrary algorithm names from an envelope.

Authenticate version, suite, relevant identities/key IDs, session context, counters/message IDs, and key-establishment data according to the protocol. Minimize publicly visible stable identifiers. Reject unknown versions/suites, invalid lengths, duplicate fields, noncanonical encodings when required, and oversized payloads. Validate caps before expensive KDF/decapsulation. Unknown or malicious ciphertext must not trigger network fetches, arbitrary file access, or deep-link execution.

Replay policy is mode-specific: ratchet counters and persisted bounded state for sessions; passphrase mode can flag duplicates using a local bounded cache but cannot promise universal replay prevention after cache deletion or on another device. Password ciphertext provides shared-secret integrity, not proof of which phrase-holder sent it.

ML-KEM-768 has a 1,184-byte public key and 1,088-byte KEM ciphertext under FIPS 203. The KEM ciphertext alone becomes about 1,452 Base64 characters before framing, signatures, and message data. Benchmark the actual reviewed protocol, which may amortize exchanges across messages. SMS is therefore a poor initial target; do not assume every message includes a new KEM or that every host preserves long text. Test truncation, Unicode, segmentation, and byte-exact round trips. Never silently downgrade for transport size.

## Implementation evidence required

Known-answer tests, negative vectors, cross-platform fixtures, parser/FFI fuzzing, constant-time primitive review, randomness failure handling, malformed KEM rejection, nonce/state rollback tests, version/downgrade tests, concurrency/crash recovery, key export/restore, and low-end physical-device profiling. Publish supported-suite specs and vectors. Measure latency, peak memory, ciphertext growth, and battery cost; set thresholds after the feasibility spike rather than inventing security-safe resource budgets.
