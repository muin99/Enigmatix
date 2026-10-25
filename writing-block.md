# Enigmatix / SecureType — Mobile Encryption SaaS

Planning revision: 2026-10-25. Status: proposal; no application implementation or completed security audit. Enigmatix is the working business name and SecureType the working product name; naming checks remain open.

## Refined product

Build a React Native mobile app to compose text privately, encrypt it locally, send ciphertext through existing apps, and decrypt locally. Sell subscriptions, usage credits, and feature packs around the utility. Customers buy software capabilities and services rather than proprietary algorithms or provider-controlled keys.

Cryptography and user secrets live on the device. The SaaS layer handles accounts, purchases, entitlements, optional public-key discovery, and optional encrypted synchronization. Backend technology remains undecided.

Initial audience hypothesis: privacy-conscious individuals and independent professionals exchanging short sensitive text. Validate willingness to install another app and verify contacts. Recipients need compatible software and the correct key relationship. Existing messaging apps still observe accounts, timing, ciphertext size, and transport metadata.

## Product principles

- Private keys, passphrases, plaintext, and plaintext contact books never enter the backend.
- Existing supported messages remain locally decryptable without payment or provider availability, provided software and keys are retained.
- Safe cryptographic defaults and security fixes are universal. Never sell a deliberately weaker free cipher.
- Use reviewed protocols and maintained libraries; no invented cryptographic algorithms.
- Explain endpoint compromise, recipient copying, recovery, and verification limitations.
- No claims of guaranteed anonymity, quantum-proof protection, or certification without evidence.

## Commercial offers

| Offer | Proposed value | Boundary |
|---|---|---|
| Free | Local text crypto, basic contacts, QR verification, essential key export | No paywall on retained supported ciphertext |
| Personal subscription | Convenient workflows, encrypted settings sync, later device management | Expiry stops paid services, not retained keys |
| Usage credit packs | Metered encrypted attachment relay/storage or later hosted batch work | Nontransferable service units, not cryptocurrency |
| Feature packs | One-time workflow unlocks, such as advanced batch tooling | No paid-only security fixes |
| Team subscription, later | Seats and policy administration | Admins receive no message keys by default |

Prices and quotas require customer research and cost estimates. Begin with Free and Personal; add packs when validated. Preserve all three purchase models in the architecture without launching overlapping offers prematurely.

Per-encryption tokens are an optional commercial mode, but reliable global charging conflicts with fully offline local crypto. A modified client can bypass local metering. Prefer credits for hosted service delivery; never send plaintext to prove usage. See the billing plan.

## Mobile flow

1. Explain protection boundaries; allow local-only use without a SaaS account.
2. Generate device keys, protect the vault, and explain recovery before first use.
3. Pair a contact using QR/fingerprint verification; label unverified identities.
4. Compose privately, confirm recipient, encrypt locally, and share ciphertext.
5. Explicitly import ciphertext, validate it, and decrypt to a private display.
6. Upgrade separately, restore eligible purchases, and inspect usage without message content.

Typing plaintext into another app before encrypting cannot undo exposure. Copying decrypted text elsewhere leaves this protection boundary.

## Decisions and scope

React Native + TypeScript for mobile product UI; Kotlin for Android IME and Swift for iOS extensions. Shared Rust crypto is a candidate subject to library/protocol evaluation. Start with companion-app composition on Android and iOS; gate keyboard releases on real-device feasibility. Desktop comes later. Backend language and hosting stay open.

Post-quantum support requires a reviewed hybrid protocol and full integration review, rather than a menu of raw algorithms. Passphrase mode is optional and exposes weak phrases to offline guessing. Blockchain is evaluated as a possible later transparency checkpoint mechanism, not a prerequisite or payment token.

## Documentation

- [Architecture and backend selection](docs/architecture.md)
- [Subscriptions, credits, and feature packs](docs/billing-and-entitlements.md)
- [Cryptography and post-quantum plan](docs/cryptography.md)
- [Security review and vulnerability register](docs/security.md)
- [Blockchain assessment](docs/blockchain.md)
- [Roadmap and release gates](docs/roadmap.md)
- [Sources and decision status](docs/references.md)
- [Preserved original blueprint](docs/archive/original-blueprint.md)

These plans supersede the original desktop-first roadmap. They describe intended behavior, not security properties already demonstrated by software.
