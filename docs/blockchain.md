# Blockchain integration assessment

Decision proposal: no blockchain dependency in the mobile MVP. Preserve an optional research track for transparency checkpoints. Usage credits are an ordinary backend ledger, not a tradable crypto asset.

## Evaluate the use case before the chain

| Proposed use | Value | Cost / risk | Recommendation |
|---|---|---|---|
| Store messages or keys on-chain | Public availability | Permanent metadata, expense, future cryptanalysis, deletion conflict | Reject, even for encrypted messages |
| Sell an encryption token | Tradable billing asset | Wallet friction, store policy, fraud, market/regulatory burden | Reject for initial product |
| Wallet-based identity | Proof of control of a wallet | Public identity linkage; not proof of human identity or PQ authentication | Not default identity |
| On-chain key directory | Public change history | Correlation, fees, revocation complexity, chain dependence | Prefer off-chain directory + transparency |
| Batch transparency checkpoints | External evidence of log history at a point in time | Chain finality, availability, governance, and migration assumptions | Optional experiment after independent monitoring |

Blockchain does not encrypt messages, prove that a first key belongs to a real person, prevent endpoint theft, or make a classical signature post-quantum safe. Ethereum's own security roadmap identifies PQ upgrades as ongoing work; evaluate the exact chain assumptions rather than claiming any chain is quantum safe by association.

## Recommended baseline

Build an authenticated public-key directory only when needed. Add a reviewed append-only transparency log with inclusion/consistency proofs, independently witnessed signed checkpoints, and client verification before considering a chain. A sole operator can present split views unless external witnesses/monitors and a client policy address equivocation. QR/out-of-band identity verification remains necessary.

## Optional checkpoint architecture

1. Construct a reviewed Merkle transparency log of authorized public-key events off-chain.
2. Independently monitor signed checkpoints and check log consistency.
3. Batch-anchor only a checkpoint commitment, log version, and tree size if the privacy review permits. No message ciphertext, user identifiers, per-user public keys, contacts, passphrase hashes, or billing data on-chain.
4. Clients verify the off-chain proof, trusted checkpoint signature, witness policy, and optional anchor finality. Define stale, missing, equivocal, and unavailable behavior before rollout.
5. Keep local encryption and decryption functional during chain outages; for new unverified key changes, show pending verification or block according to the documented trust policy, never silently accept them.

A hash commitment is not automatically anonymous: deterministic per-user hashes can be enumerable or correlatable. Batch roots reduce direct exposure but still need analysis of disclosure, timing, and log-leaf access. Do not publish passphrase commitments or use blockchain storage as an encrypted backup.

## Experiment gates

Document chain selection, finality/reorg handling, fees, RPC trust, network privacy, monitor independence, anchoring-key rotation, contract upgrade authority, PQ signature assumptions, and chain migration/exit. Prefer a simple existing checkpoint mechanism over a custom contract; if a contract is needed, require independent review and testnet validation. Do not couple chain finality to paid local decryption or include a speculative token launch in the roadmap.

Success criterion: independently detectable key-history equivocation with acceptable metadata and availability costs compared with a witnessed off-chain log. If blockchain adds no measurable benefit, retain the off-chain design.
