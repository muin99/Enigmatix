# Research references and decision status

Checked 2026-10-25. Primary sources support the technical constraints below. Product architecture, sequencing, pricing model, and blockchain deferral are our recommendations, not endorsements by the source authors. Recheck mutable policies, documentation, errata, and dependencies at implementation and before release.

| Source | Relevance |
|---|---|
| [NIST FIPS 203](https://csrc.nist.gov/pubs/fips/203/final) | ML-KEM role, parameter sets and sizes; review potential-update/errata notices |
| [NIST PQC migration FAQ](https://pages.nist.gov/nccoe-migration-post-quantum-cryptography/) | Distinguishes ML-KEM key establishment from ML-DSA/SLH-DSA signatures |
| [Signal PQXDH specification](https://signal.org/docs/specifications/pqxdh/) | Asynchronous hybrid handshake; referenced revision's classical-authentication and active-quantum limitations |
| [Signal Double Ratchet specification](https://signal.org/docs/specifications/doubleratchet/) | Double, Sparse Post-Quantum, and Triple Ratchet research inputs |
| [RFC 9106](https://www.rfc-editor.org/rfc/rfc9106.html) | Argon2id, parameter guidance and test vectors; informational RFC |
| [React Native native modules](https://reactnative.dev/docs/turbo-native-modules-introduction) | Typed native-module integration |
| [Apple custom keyboard interfaces](https://developer.apple.com/documentation/uikit/configuring-a-custom-keyboard-interface) | Secure fields, restricted keyboard types, host exclusion |
| [Apple keyboard Open Access](https://developer.apple.com/documentation/uikit/configuring-open-access-for-a-custom-keyboard) | Sandboxing, network and shared-container write implications |
| [Apple App Review Guidelines](https://developer.apple.com/app-store/review/guidelines/) | Digital purchases, purchased-credit expiry, restoration, cryptocurrency restrictions; regional exceptions need separate review |
| [Google Play Payments policy](https://support.google.com/googleplay/android-developer/answer/9858738?hl=en) | Digital goods billing and currency scope; program exceptions vary |
| [Google Play billing security](https://developer.android.com/google/play/billing/security) | Backend purchase verification and abuse mitigation; applies to billing logic, not moving message crypto server-side |
| [OWASP MASVS](https://mas.owasp.org/MASVS/) | Mobile verification categories and assessment structure |
| [Ethereum security roadmap](https://ethereum.org/roadmap/security/) | PQ-related blockchain upgrades remain a separate security concern |

## Decision log

- D01 Accepted direction: mobile-first React Native; native extensions for platform keyboards.
- D02 Recommended: preserve free local decryption/export and universal safe security defaults.
- D03 Recommended: subscriptions for recurring services, credits for metered hosted value, packs for workflows.
- D04 Open: exact backend language, hosting, auth provider, data residency.
- D05 Open/release gate: reviewed protocol and library, exact PQ/authentication guarantees, licensing.
- D06 Recommended: no blockchain/wallet dependency in MVP; later checkpoint experiment only if justified.
- D07 Open/platform gate: safe iOS extension vault/access workflow and Full Access requirements.
- D08 Recommended: user-held encrypted export before multi-device recovery/sync.

## Review limits

The original document is archived unchanged. No source code, runtime, cloud configuration, dependency versions, deployed contract, or production device behavior was available. The review identifies architecture risks; it is not a penetration test, proof of cryptographic security, legal opinion, or complete vulnerability inventory. Next evidence comes from the feasibility spikes, protocol review, implementation tests, and independent assessments specified in the roadmap.
