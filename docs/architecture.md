# Mobile architecture and backend decision

Status: proposed, 2026-10-25.

## Components and boundaries

| Component | Responsibility | Forbidden data/path |
|---|---|---|
| React Native + TypeScript | Onboarding, contacts UI, purchases, settings, sharing | Raw long-lived private keys in JS APIs |
| Native sensitive views and vault | Private composition, unlock, protected storage | Analytics, uploaded prediction, secret logs |
| Shared native crypto core | Keys, protocol state, envelope validation, encryption | Payment dependency for decryption |
| Kotlin Android IME / Swift iOS extension | Private composition, ciphertext insertion | Account login, billing, unrestricted vault access |
| SaaS API | Accounts, catalog, verified entitlements, ledger | Plaintext, passphrases, private keys |
| Optional directory | Public device keys, signed prekeys, rotations | Secret material |
| Optional sync/relay | Opaque encrypted objects | Unwrapped object keys, plaintext indexes |

Message path: private input → native crypto → authenticated ciphertext → OS share interface → transport app. Incoming data: explicit import → bounded parser → native verification/decryption → private display. Billing path: store transaction → backend verification → ledger/entitlement → signed cached capability snapshot.

Account identity, billing identity, and cryptographic device identity are distinct. Do not require address-book or phone-number upload. Minimize linkage and document metadata retained by discovery, billing, IP logs, and storage.

## React Native implementation

Use typed native-module bindings with opaque key handles. Keep generation, derivation, ratchets, and secret-key operations native. Ordinary React Native TextInput places plaintext in JS-managed memory: acceptable only as a documented prototype limitation. Evaluate native sensitive composition views for production. Display still exposes plaintext in process memory; native code does not guarantee complete erasure.

No secrets in AsyncStorage, persisted Redux state, logs, crash reports, analytics, or remote configuration. Review signed app updates and any OTA JS update path as part of the security boundary; a malicious UI update could exfiltrate typed text even if crypto remains native. Pin compatible native/JS/protocol versions.

Rust is a candidate, not a selected dependency. Spike target builds, FFI ownership, cancellation, licensing, maintenance, test vectors, audit history, and upgrade support. Native modules and extensions require a native-capable build pipeline; a JS-only sandbox is insufficient.

## Platform gates

Android: Kotlin InputMethodService with an isolated composition buffer; commit only ciphertext to the host. Disable prediction/learning and text telemetry on sensitive surfaces. Test switching keyboards, process recreation, low memory, accessibility, screenshots, and host formatting. A third-party keyboard in the companion app can also observe plaintext; evaluate a dedicated native input surface.

iOS: Swift keyboard extension has a separate process and restrictions. Secure fields and some keyboard types use the system keyboard; hosts may reject extensions. Full Access affects network and shared-container writes. Prove vault access, keychain/access groups, lock-state authentication, configuration sharing, memory budget, and offline entitlement behavior on real devices. Do not promise a Full-Access-free workflow before proving it. Use companion-app compose/share when safe extension operation is unavailable. No networking for plaintext in either keyboard.

Protect wrapping keys with Android Keystore / Apple Keychain and appropriate lock-state policies. Do not assume hardware executes arbitrary ML-KEM/ML-DSA operations; wrapping software PQ keys differs from hardware-native PQ keys. Test backup exclusions, biometric changes, reinstall, device migration, and loss.

## Backend remains undecided

Start with a modular API and worker, not microservices. PostgreSQL is a recommended transactional database candidate; object storage and a queue are conditional needs.

| Candidate | Potential advantage | Must validate |
|---|---|---|
| TypeScript | Team language reuse, integration speed | Dependencies, runtime discipline, job reliability |
| Go | Compiled operations, concurrency | Team familiarity and integration cost |
| Rust | Ownership guarantees, shared tooling | Delivery cost and maintainer availability |
| Managed BaaS | Quick auth/data prototype | Authorization rules, privileged jobs, portability, regions |

Proposed scoring: team competence 25%, transaction/idempotency correctness 25%, security/operations 20%, cost 15%, portability/data residency 15%. No scores without evidence. Every candidate must demonstrate purchase verification, concurrent spend correctness, tenant authorization, deletion, restore, rate limits, and secret-free observability. Record a selection ADR before implementation.

## Proposed API and data

API: purchase verification, entitlement retrieval, credit reservation/commit/release, authenticated provider webhook ingestion, optional public-key registration/retrieval/rotation. Mutation calls require authenticated ownership, bounded inputs, and idempotency keys. Key-directory writes require cryptographic authorization beyond account login.

Entities: account, device, public-key bundle, store transaction, entitlement, credit lot, immutable ledger entry, usage reservation, webhook inbox/outbox, encrypted object, deletion request. Database uniqueness enforces transaction deduplication. Usage records contain service units, never message text. Operators use least privilege and audited emergency access; no administrative decrypt endpoint.

## Offline, recovery, and devices

Core crypto and stored verified contacts work offline. New directory discovery does not. A proposed seven-day signed entitlement cache can support conveniences; it cannot prove globally unspent offline credits. Outages must not block local decryption.

User-controlled encrypted key export is the initial recovery candidate. Password reset cannot recover encryption keys. New-device enrollment needs trusted-device approval or user recovery material. Never clone ratchet state casually between devices. Multi-device messaging is a later reviewed protocol feature. Revocation affects future trust/services, not delivered plaintext or attacker-held keys. Backup recovery may weaken forward secrecy if old message keys are retained; disclose and test that tradeoff.
