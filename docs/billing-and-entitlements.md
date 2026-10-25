# Billing and entitlements

Status: proposal. Prices, quotas, taxes, launch regions, and refund terms remain open.

## Catalog

Subscriptions grant capabilities for a verified term. Consumable packs grant integer service units. Nonconsumable packs unlock named workflows. Call units usage credits, not blockchain tokens. Launch Free and Personal first; add other SKUs when useful demand and costs are measured.

All users retain safe defaults, security fixes, local key export, and local decryption of supported retained messages. Prefer universal approved PQ defaults once production-ready; expiry must never downgrade established crypto silently. A feature pack buys convenience, not an allegedly secret algorithm.

Each offer must explain duration, renewal, included services, credit unit definition, restoration, cancellation, and offline behavior. If subscription covers an operation, spend no purchased credits. Otherwise show credit cost and require explicit confirmation; never silently switch an expired subscriber to paid credits.

## Pay-per-encryption decision

Strict global spend accounting conflicts with independent offline cryptography. A modified client can bypass local counters or roll back state. If offered, an online outbound plan can reserve units before encryption and commit after a defined completion event, but the server cannot prove local execution without trusting the client. Never upload plaintext as proof. Recommended decision: meter hosted attachment delivery/storage rather than local crypto CPU work. Offline quotas must accept bounded fraud; no claim of tamperproof offline tokens.

## Payment lifecycle

Use StoreKit / Apple In-App Purchase and Google Play Billing as the default for digital goods. Regional exceptions require eligibility review, not assumptions. No wallet/crypto-based bypass. Recheck policies before submission; see references. Purchased credits are non-expiring in this proposed catalog, consistent with Apple's stated rule. Separate promotional/periodic allowances and disclose their rules.

Purchase: pending → server-verified → grant recorded → provider acknowledgement/consumption as required → active. Pending/invalid transactions grant nothing. Bind verification to account, provider, app, product, transaction, and environment. Credentials stay server-side. Deduplicate callbacks and authenticate provider notifications. Durable inbox/outbox and periodic reconciliation recover missed, reordered, or interrupted processing.

Subscription states include pending, active, grace, retry/on-hold, expired, revoked; map exact provider semantics. Cancellation normally disables renewal while verified paid access continues unless refunded/revoked. Restore eligible subscriptions and nonconsumables using provider flows. Consumed credits rely on the account ledger; a store restore call is not a substitute. Explain account linking before consumable purchase.

## Ledger and spending

Use integer units, atomic database transactions, unique provider transaction IDs, and append-only entries: grant, reserve, commit, release, reversal, support adjustment. Track purchased lots separately from subscription allowances. No transfers, cash-out, or investment claims.

Reserve balance atomically, binding idempotency key to user, operation, amount, and catalog version. Commit after durable hosted-service delivery; release failed/expired reservations. A recovery worker resolves abandoned operations. Concurrent spending from two devices must not overdraft. Retries must return the same outcome.

Refund with compensating entries rather than editing ledger history. Refunded already-spent units become an accounting exception; restrict future paid service under disclosed terms if appropriate, never erase keys or block decryption. Ledger retention for financial obligations and privacy deletion must be reconciled before launch.

Signed cached entitlement snapshots can allow a proposed seven-day convenience grace period. Modified clients can bypass local feature enforcement; accept that tradeoff. Attestation is an optional abuse signal, not identity authentication or evidence of secure plaintext handling.

## Required verification

- Duplicate callbacks grant once; wrong-account/product/environment and pending purchases grant nothing.
- Refund/revocation cannot regrant through replay; reordered notifications converge to verified provider state.
- Two devices spending the last unit yield only one successful reservation.
- Crash/retry after service success neither double-charges nor loses delivery.
- Covered operations consume no purchased credits; fallback requires consent.
- Reinstall, restore, account change, offline expiry, and outage behavior are documented.
- No purchase state blocks local decryption, retained key export, or security fixes.
