# Mobile delivery roadmap

Planning date: 2026-10-25. Phases are dependency gates, not date promises. Staffing, budget, target jurisdictions, and protocol/library availability remain unknown.

## Phase 0 — Validate and resolve hard constraints

Deliver customer interviews around two-party onboarding, competitor comparison, initial price hypotheses, launch-country/store eligibility review, and cost model. Prototype Android/iOS native composition, Rust/native bindings, key storage, long ciphertext sharing, and iOS extension access on physical devices. Compare backend candidates using the architecture rubric.

Exit: named owners; agreed initial customer/use case; approved protocol/library candidate and license review; measured mobile feasibility; explicit companion-app fallback for iOS; backend ADR; product unit definitions. Do not promise universal SMS/app compatibility.

## Phase 1 — Local mobile technical alpha

Build React Native shell, native sensitive composition, protected vault, contact identity/trust UI, reviewed local encryption profile, explicit import/share, bounded envelope parser, QR verification where supported, and encrypted export/restore. Use cross-platform fixtures from day one. A passphrase prototype must remain labeled experimental until reviewed; do not treat it as the final identity protocol.

Exit: offline round trip on Android and iOS, tamper/wrong-key rejection, no plaintext observed in host editor or logs, documented lost-device behavior, safe malformed-input limits, successful recovery drill. No real payments or production cryptographic claims.

## Phase 2 — SaaS and commercial beta

Implement selected backend, account/device separation, verified purchases, catalog, subscription/nonconsumable entitlements, signed offline capability cache, ledger foundation, sandbox credit packs for a defined hosted service, reconciliation, deletion, and admin audit. Add optional directory only with reviewed identity authorization and change warnings. Do not require a SaaS account for local use.

Exit: duplicate/refund/concurrency tests pass, restore/account transitions are understood, no cross-account authorization failures, price/unit disclosures reviewed, service outage and expired subscription do not block local decryption/export. Confirm launch-market payment availability and policies before accepting money.

## Phase 3 — Keyboard integrations

Android Kotlin IME first; Swift iOS extension only when Phase 0 gates are satisfied. Keep purchases in the companion app. Add explicit decrypt import flows; no promise that a keyboard can read arbitrary received messages from another app.

Exit: host compatibility matrix records tested OS/app versions, plaintext boundary tests, lock-state/low-memory/process-restart tests, keyboard permission disclosures, and companion-app fallback. Defer unsupported surfaces rather than requesting broad accessibility privileges to scrape text.

## Phase 4 — Reviewed hybrid PQ integration

This work starts as research in Phase 0 and must precede any production PQ claim. Finalize exact reviewed handshake/ratchet, identity authentication guarantees, suite versioning, downgrade/replay defenses, prekey lifecycle, and state migration. Benchmark actual protocol overhead, not just primitive speed. Publish test vectors and protocol documentation.

Exit: independent protocol/integration review, vectors on both platforms, adversarial key-substitution/rollback tests, mobile resource measurements, migration/rollback plan, and accurate wording about harvest-now-decrypt-later versus active quantum attacks. If PQ is a launch requirement, this phase blocks public launch; it is not silently replaced by classical crypto.

## Phase 5 — Independent review and production readiness

Audit crypto integration, native boundary, mobile surfaces, backend authorization, payments, and release pipeline. Establish security contact, signed release process, dependency monitoring, incident response, privacy/deletion rules, restore drills, support documentation, and store submission evidence.

Exit: security gates in security.md satisfied; critical/high findings fixed or affected features disabled; legal/store/privacy review for actual launch countries complete; product claims match audited scope and version. A technical alpha is not a safe substitute for this gate.

## Later work

Reviewed multi-device protocol, encrypted attachments, teams, desktop companions, independent transparency witnesses, then optional blockchain checkpoint experiment. Group messaging, mandatory wallets, tradable tokens, cloud plaintext processing, compliance certification claims, and arbitrary algorithm marketplaces are out of MVP scope.

## Backlog and measures

| Workstream | First accountable role | Deliverable |
|---|---|---|
| Product | Product lead | Interviews, onboarding study, catalog and pricing hypotheses |
| Mobile | Mobile lead | Native composition and extension feasibility evidence |
| Cryptography | Crypto/security lead | Protocol/library ADR, test vectors, review plan |
| SaaS | Backend lead | Backend ADR, purchase state machine, transactional ledger |
| Operations | Release lead | Signing, SBOM, restore and incident runbooks |

Track pairing completion, successful first cross-device decrypt, recipient verification mistakes, ciphertext compatibility failures, p50/p95 operation latency, peak memory, crash rate, paid conversion, refund rate, ledger discrepancies, cost per hosted service unit, and audit findings. Do not collect message content to obtain these metrics. Establish numeric targets after baseline measurements and customer tests.

## Decisions still required

Launch audience/countries; budget and staffing; exact protocol/library and licenses; native input UX; backend language/hosting; account authentication; recovery-export UX; metadata retention; cloud sync scope; prices and units; iOS keyboard feasibility; audit provider/scope. These remain open choices, not hidden implementation assumptions.
