# SecureType — A Verifiable, Cross-Platform, Post-Quantum-Ready Encryption Keyboard

**Project Type:** Cybersecurity / Applied Cryptography / Privacy-Preserving Software

**Target Platforms:** Android, iOS, Windows, macOS

**Project Status:** Proposed architecture

**Core Philosophy:** User-controlled secrets, independent encryption, verifiable security, and minimal trust in the software provider.

## 1. Project Overview

SecureType is a cross-platform encryption system designed to protect text communications independently of the application used to transmit them.

Users can write messages through a dedicated mobile keyboard or desktop companion application, select a recipient, choose an approved encryption profile, and transform plaintext into encrypted text.

The ciphertext can then be transmitted through existing messaging platforms, including WhatsApp, Messenger, Discord, email, and SMS, subject to each application's message-length and formatting restrictions.

The recipient uses SecureType to decrypt the message locally.

### Main Objectives

1. Provide application-independent text encryption.
2. Allow different encryption secrets for different contacts.
3. Support human-rememberable shared passphrases.
4. Provide conventional and post-quantum cryptographic options.
5. Establish communication keys without transmitting secret keys in plaintext.
6. Make core encryption and decryption independent of centralized servers.
7. Prevent service operators from decrypting messages using server-held data.
8. Make encryption behavior independently verifiable.
9. Minimize plaintext exposure to third-party applications.
10. Support secure offline operation where possible.

## 2. Supported Platforms and Workflows

### 2.1 Android

Develop a custom system keyboard using Kotlin and Android's InputMethodService.

**Workflow:**

1. Open any compatible text-based application.
2. Activate SecureType.
3. Select a recipient or encryption profile.
4. Compose text in the keyboard's isolated composition interface.
5. Press the dedicated Encrypt button.
6. Encrypt the text locally.
7. Insert only the ciphertext into the destination application's text field.
8. Send normally.

The keyboard should not insert plaintext into the host application before encryption.

For incoming messages, SecureType can provide a Decrypt action through supported text-selection, sharing, or clipboard workflows.

### 2.2 iOS

Implement SecureType using an iOS custom keyboard extension and a companion application.

Because iOS restricts third-party keyboard functionality, some workflows may require the companion application.

The implementation must account for secure text fields, host applications that disable third-party keyboards, clipboard permissions, and extension sandbox limitations.

### 2.3 Windows and macOS

Develop desktop companion applications with configurable global keyboard shortcuts.

**Quick Encrypt:**

1. Write and select text in another application.
2. Press a configured shortcut.
3. SecureType reads the selected text or clipboard.
4. Encrypts it locally.
5. Replaces or copies the encrypted result.

This mode is convenient but cannot guarantee that the original application did not already process the plaintext.

**Secure Compose:**

1. Press a shortcut to open SecureType.
2. Compose text in a dedicated private window.
3. Select the contact and encryption profile.
4. Encrypt the message.
5. Paste only ciphertext into the destination application.

Secure Compose should be the recommended workflow for sensitive information.

## 3. Per-Contact Encryption Management

Every user can maintain separate cryptographic relationships with different contacts.

**Example:**

| Contact | Secret configuration | Security profile |
|---|---|---|
| Bob | Unique shared passphrase A | Password-Based |
| Charlie | Unique shared passphrase B | Hybrid Post-Quantum |
| David | Verified device keys + optional phrase C | High-Assurance |
| Emma | Verified device keys | Standard E2EE |

A contact's cryptographic configuration should be isolated from other contacts.

### Features

- Add, edit, or remove contacts.
- Assign different passphrases to different contacts.
- Select encryption profiles independently.
- Change or rotate contact secrets.
- Display recipient verification status.
- Warn when a contact's identity key changes.
- Remember settings locally using protected device storage.
- Optionally require biometric or device authentication before accessing saved secrets.

The application must distinguish a contact's display name from their verified cryptographic identity.

## 4. Encryption Profiles

SecureType should offer approved, versioned security profiles.

### Profile A: Password-Based Encryption

**Purpose:** Simple, offline encryption using a shared human-rememberable phrase.

**Components:**

- Argon2id for password-based key derivation.
- AES-256-GCM or an approved XChaCha20-Poly1305 construction.
- Random salt.
- Algorithm-appropriate nonce.
- Authenticated ciphertext format.

**Workflow:**

Passphrase → Argon2id → Symmetric key → Authenticated encryption → Ciphertext

The recipient enters the same passphrase and derives the key from the included salt and KDF parameters.

**Security limitation:** Attackers holding ciphertext can attempt offline password guessing. Argon2id raises the cost but does not compensate for a weak passphrase.

This mode should be labeled accordingly.

### Profile B: Standard End-to-End Encryption

**Purpose:** Strong contact-specific encryption without relying solely on human passwords.

**Components:**

- Authenticated public-key agreement.
- X25519-based key establishment.
- HKDF-SHA-256 or HKDF-SHA-512.
- AES-256-GCM or another approved authenticated cipher.
- Recipient identity verification.

For ongoing asynchronous sessions, use a reviewed ratcheting protocol.

**Workflow:**

Verified recipient public key → Authenticated key agreement → Session key → Message encryption

Private keys remain on their respective devices.

### Profile C: Post-Quantum Encryption

**Purpose:** Protect encrypted communications against currently understood quantum attacks.

**Components:**

- ML-KEM-768 or ML-KEM-1024 for post-quantum key establishment.
- HKDF for key derivation.
- AES-256-GCM for authenticated message encryption.
- Quantum-resistant identity authentication, such as an appropriate ML-DSA-based protocol.
- Verified recipient identity binding.

ML-KEM is a key-encapsulation mechanism, not a direct replacement for a symmetric bulk-encryption algorithm.

**Workflow:**

Verified post-quantum public key → ML-KEM encapsulation → Shared secret → KDF → AES-256-GCM → Ciphertext

The sender transmits the KEM encapsulation ciphertext along with the encrypted message. The recipient decapsulates it using their private key.

The design must specify how public keys are authenticated and how key replacement, replay resistance, and protocol versioning are handled.

### Profile D: Hybrid Post-Quantum Encryption

**Purpose:** Combine classical and post-quantum key-establishment mechanisms.

**Components:**

- X25519 key agreement.
- ML-KEM-768 or ML-KEM-1024.
- A reviewed hybrid key-combination construction.
- HKDF.
- AES-256-GCM.
- Authenticated identity verification.
- Optional post-quantum ratcheting for ongoing communication.

**Workflow:**

Classical key establishment + Post-quantum key establishment → Secure hybrid combination → Message encryption key → Ciphertext

A correctly designed hybrid protocol can preserve confidentiality when one of its component assumptions remains secure.

However, the authentication mechanism also needs evaluation against quantum attackers.

### Profile E: High-Assurance Encryption

**Purpose:** Provide an advanced, carefully reviewed configuration for highly sensitive communications.

Possible requirements:

- Hybrid post-quantum key establishment.
- Quantum-resistant identity authentication.
- Verified contact fingerprints.
- Automatic session-key rotation.
- Forward secrecy where supported by the protocol.
- Replay protection.
- Strict plaintext and clipboard handling.
- Hardware-backed device key protection where available.
- Independent implementation audit.

This profile should only be described as High-Assurance once its complete protocol and implementation have undergone appropriate security review.

## 5. User-Defined Human-Rememberable Keys

SecureType must support user-created memorable passphrases.

Example:

Alice and Bob agree on a unique phrase. Alice and Charlie use another.

Each relationship has independent secret material.

### Recommended Implementation

- Use Argon2id for password-based encryption.
- Generate a fresh random salt when deriving a message encryption key from a passphrase.
- Store the salt and approved KDF parameters with the ciphertext.
- Recommend long, randomly generated multiword passphrases.
- Avoid passwords based on names, birthdays, or predictable phrases.
- Never transmit passphrases to the service provider.
- Never store plaintext passphrases in cloud databases.

**Important security distinction:**

A user-entered passphrase should not automatically be advertised as post-quantum secure merely because AES-256 is used afterward.

If the passphrase is weak, offline guessing remains possible with conventional or quantum-enabled attackers.

### Stronger Optional Model

Allow the memorable phrase to act as an additional factor in a device-key-based cryptographic relationship.

Use a formally reviewed password-authenticated key-exchange protocol or a carefully specified multi-factor construction.

Do not invent a custom method of combining passwords and cryptographic keys.

## 6. First-Time Key Establishment

SecureType should support multiple ways to establish trusted cryptographic relationships.

### Method A: Direct QR Verification

1. Alice and Bob generate cryptographic identity keys locally.
2. They exchange authenticated public-key fingerprints using QR codes or equivalent verification.
3. Each device records the verified identity key.
4. Subsequent encryption uses authenticated recipient keys.
5. Unexpected identity-key changes trigger warnings.

### Method B: Public-Key Directory

An optional directory stores:

- Public identity keys.
- Public encryption/prekey bundles.
- Public key versions.
- Signed key-update records.
- Relevant transparency proofs.

It must not store plaintext messages, private keys, or shared passphrases.

### Method C: Password-Based Relationship

Two users independently agree on a sufficiently strong passphrase through a trusted channel.

They can then exchange encrypted messages without relying on a centralized key directory.

This is convenient but inherits the offline-guessing risk of password-based encryption.

### Method D: Auditable Key Transparency

Maintain an append-only, externally auditable record of public identity-key registration and updates.

Clients check consistency proofs and reject unauthorized key substitutions.

A transparency system should not be treated as proof that an initial key belongs to a particular real-world person without a valid identity-binding method.

## 7. Independence from the Software Provider

The system should minimize dependence on SecureType-owned infrastructure.

**Operations that should work locally:**

- Key generation.
- Encryption.
- Decryption.
- Password-based key derivation.
- Stored-contact verification.
- Offline ciphertext handling.

**Optional online services:**

- Public-key discovery.
- Prekey distribution.
- Key transparency.
- Encrypted settings synchronization.
- Signed software update distribution.

The service operator should not possess sufficient server-side secret material to decrypt user messages.

No universal decryption key, administrative override, or server-side escrow key should exist.

This does not protect against compromised endpoints or malicious client software updates.

## 8. Post-Quantum Cryptography Strategy

### Primary algorithms

| Function | Candidate |
|---|---|
| Post-quantum key establishment | ML-KEM-768 |
| Higher-parameter KEM option | ML-KEM-1024 |
| Post-quantum signatures | ML-DSA |
| Alternative PQ signature family | SLH-DSA |
| Symmetric encryption | AES-256-GCM |
| Password derivation | Argon2id |
| Classical agreement in hybrid mode | X25519 |
| Hash/KDF building blocks | SHA-256 / SHA-512 / HKDF |

These primitives serve different roles. They must be assembled through a coherent, reviewed cryptographic protocol.

### Quantum-era threat model

The system should consider:

1. **Harvest-now-decrypt-later attacks:** Adversaries record encrypted traffic today and attempt decryption after quantum computing improves.
2. **Quantum attacks on public-key cryptography:** Classical RSA and elliptic-curve methods could become vulnerable.
3. **Offline passphrase guessing:** Weak user-chosen phrases remain vulnerable regardless of the bulk cipher.
4. **Quantum-era authentication:** A post-quantum KEM alone does not ensure quantum-resistant identity authentication.
5. **Future cryptanalysis:** Post-quantum algorithms may need replacement if vulnerabilities are discovered.

### Cryptographic Agility

Every encrypted message should identify its approved cryptographic suite and protocol version.

New algorithms can then be introduced without silently changing the interpretation of existing ciphertext.

The application must prevent attackers from downgrading a conversation to a weaker profile without appropriate authenticated authorization.

## 9. Encrypted Message Format

SecureType requires a versioned, portable ciphertext envelope.

Conceptual structure:

```json
{
  "version": 1,
  "suite": "HYBRID_PQ_V1",
  "sender_key_id": "...",
  "recipient_key_id": "...",
  "message_id": "...",
  "kdf_parameters": {},
  "salt": "...",
  "nonce": "...",
  "key_establishment_data": "...",
  "ciphertext": "...",
  "authentication_tag": "..."
}
```

The exact fields vary by encryption profile.

Sensitive metadata should be minimized, and relevant envelope fields must be cryptographically authenticated.

The serialized envelope can be encoded into a transport-safe text representation, for example:

`ST1:<encoded-payload>`

The format must support algorithm upgrades, key rotation, and robust parsing while avoiding unnecessary information disclosure.

## 10. Security and Privacy Requirements

### Cryptographic security

- Authenticated encryption.
- Secure random-number generation.
- Appropriate nonce management.
- Strong key derivation.
- Secure identity binding.
- Replay detection.
- Protocol downgrade resistance.
- Safe key rotation.
- Secure secret deletion where realistically supported.
- Correct handling of decryption failures.

### Application security

- No plaintext keystroke telemetry.
- No plaintext analytics.
- No secret logging.
- Minimal permissions.
- Restricted clipboard use.
- Clear secret-memory lifetime.
- Secure local storage.
- Safe error handling.
- No unnecessary network access.

### Endpoint limitations

The product cannot guarantee confidentiality against:

- A fully compromised operating system.
- A malicious keyboard build.
- Screen capture by privileged malware.
- Compromised private keys.
- Physical access to unlocked devices.
- Host applications that already received plaintext before encryption.

Security claims must explicitly state these limitations.

## 11. Public Verification and Transparency

SecureType should be designed so that users do not need to accept security claims solely on trust.

### Verification mechanisms

**Open-source client:** Publish the complete encryption engine, keyboard implementation, and key-management code.

**Reproducible builds:** Allow independent developers to reproduce distributed binaries from the published source.

**No server-side secret storage:** Make the storage architecture inspectable and testable.

**Independent security audits:** Review cryptographic integration, identity verification, keyboard isolation, and update mechanisms.

**Public test vectors:** Publish known-input and expected-output tests for supported cryptographic profiles.

**Key transparency:** Allow independent verification of public-key histories.

**Local-only cryptographic operations:** Demonstrate encryption and decryption without contacting the provider.

### Scope of the Security Promise

The intended claim is:

> SecureType is designed so that the service provider cannot decrypt user messages using server-controlled data, while verified client software performs encryption and decryption locally using user-controlled secret material.

The design must not claim universal protection against compromised user devices or malicious client releases.

## 12. Security Testing Plan

| Test | Objective |
|---|---|
| Ciphertext tampering | Verify authenticated decryption fails |
| Wrong contact key | Confirm decryption is rejected |
| Wrong passphrase | Confirm decryption is rejected |
| Password guessing assessment | Quantify passphrase-security limitations |
| MITM key substitution | Verify unauthorized key changes are detected |
| Replay tests | Ensure duplicate messages can be identified |
| Nonce misuse tests | Validate algorithm-specific nonce safety |
| Malformed envelope tests | Prevent parsing vulnerabilities |
| Server compromise simulation | Verify backend data alone cannot decrypt |
| Offline functionality | Validate independence from servers |
| Cross-platform compatibility | Verify interoperable encryption/decryption |
| Quantum-threat assessment | Review current and future algorithm assumptions |
| Host application leakage tests | Evaluate exposure before and after encryption |
| Malicious update analysis | Document software distribution trust boundaries |

## 13. Suggested Technology Stack

| Component | Technology |
|---|---|
| Android keyboard | Kotlin |
| iOS keyboard | Swift |
| Windows application | Rust with native UI integration |
| macOS application | Swift or Rust with native integration |
| Shared cryptographic core | Rust |
| Conventional cryptography | Reviewed libraries |
| Post-quantum primitives | Standards-conformant, maintained implementations |
| Optional directory backend | Rust, Go, or another suitable backend |
| Optional directory storage | PostgreSQL |
| Source management | Git and public repository |
| Automated verification | CI/CD, reproducible builds, security tests |

Avoid implementing AES, Argon2id, ML-KEM, or digital signature algorithms from scratch.

## 14. Development Roadmap

### Phase 1 — Cryptographic Prototype

- Build a local text-encryption application.
- Implement approved password-based encryption.
- Support multiple contacts and different passphrases.
- Implement portable ciphertext encoding.
- Verify encryption/decryption compatibility.

### Phase 2 — Desktop Application

- Implement Windows and macOS shortcut workflows.
- Add secure compose mode.
- Add contact profiles.
- Integrate protected key storage.
- Test clipboard and plaintext leakage.

### Phase 3 — Mobile Keyboard

- Develop Android custom keyboard.
- Implement private composition.
- Add Encrypt and Decrypt controls.
- Test host-application compatibility.
- Prototype iOS within platform restrictions.

### Phase 4 — Authenticated Key Exchange

- Implement verified public-key identities.
- Add QR verification.
- Introduce reviewed asynchronous key agreement.
- Add contact key rotation and change warnings.
- Introduce the optional public-key directory.

### Phase 5 — Post-Quantum Support

- Integrate a reviewed ML-KEM-based protocol.
- Add approved hybrid key establishment.
- Evaluate post-quantum authentication.
- Implement security-profile negotiation.
- Compare performance, ciphertext size, and usability.

### Phase 6 — Independent Security Verification

- Publish source code.
- Implement reproducible builds where supported.
- Publish test vectors.
- Perform threat-model reviews.
- Commission independent audits.
- Test server-compromise and key-substitution scenarios.

## 15. Potential Research Contributions

SecureType could support research in:

1. Application-independent end-to-end encryption.
2. Usability of human-rememberable contact-specific secrets.
3. Hybrid post-quantum key establishment for cross-application encrypted text.
4. Prevention and measurement of plaintext exposure in mobile keyboard workflows.
5. Verifiable operator-independent encryption.
6. Public-key transparency without mandatory centralized trust.
7. Performance and usability comparison of conventional and post-quantum encryption profiles.

Potential evaluation metrics include encryption/decryption latency, ciphertext expansion, memory use, battery impact, onboarding time, contact-key verification success, user errors, and measured plaintext exposure.

These are proposed research directions, not established novelty claims. A literature review and comparison with existing tools are necessary before claiming originality.

## 16. Proposed Project Title

**SecureType: A Verifiable Cross-Platform Encryption Keyboard with Contact-Specific Secrets and Hybrid Post-Quantum Cryptography**

### Short Description

SecureType is a proposed privacy-focused encryption platform that enables users to protect text communications independently of the messaging applications they use. It combines secure mobile keyboard input, desktop encryption shortcuts, contact-specific human-rememberable secrets, authenticated key establishment, and configurable conventional and post-quantum cryptographic profiles. Its architecture emphasizes client-side encryption, reduced reliance on centralized infrastructure, public verification of security mechanisms, and user control over cryptographic keys.

### Core Principle

**Users control their secrets. Devices perform cryptography locally. Messaging platforms transport ciphertext. The service provider is not entrusted with message-decryption keys.**

---

**End of project blueprint.**