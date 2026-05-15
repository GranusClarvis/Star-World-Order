# Deployed Contracts

Canonical mapping of SWO contract versions to deployment addresses.
This file is the source of truth for on-chain identity. Update it in the
same PR that deploys a contract.

## Monad Mainnet (chain id 143)

| Contract | Version | Address | Block | Status | Notes |
|---|---|---|---|---|---|
| Skrumpeys NFT | v1 | `0xb0dad798c80e40dd6b8e8545074c6a5b7b97d2c0` | — | Live | External collection, not deployed by SWO |
| Multicall3 | canonical | `0xcA11bde05977b3631167028862bE2a173976CA11` | — | Live | Canonical cross-chain address |
| StarForge | V5 | _not yet deployed_ | — | Planned | See `contracts/StarForgeV5.sol` |
| StarSkrumpeyMarketplace | v1 | _not yet deployed_ | — | Planned | See `contracts/StarSkrumpeyMarketplace.sol` |
| StarSkrumpeyStaking | v1 | _not yet deployed_ | — | Planned | See `contracts/StarSkrumpeyStaking.sol` |
| StarWorldOrderGovernor | v1 | _not yet deployed_ | — | Planned | See `contracts/StarWorldOrderGovernor.sol` |

### Cosmic Casino (chain id 143)

| Contract | Version | Address | Block | Status | Notes |
|---|---|---|---|---|---|
| CasinoBankroll | v1 | _not yet deployed_ | — | Planned | Mainnet ceremony pending operator gate (Phase E) |
| CosmicFlip | v1 | _not yet deployed_ | — | Planned | Same CREATE3 deployer → same address as testnet |
| GravityDice | v1 | _not yet deployed_ | — | Planned | — |
| ConstellationClimb | v1 | _not yet deployed_ | — | Planned | Hi-Lo, renamed for SWO theme |
| CasinoAllowlist | v1 | _not yet deployed_ | — | Planned | Mainnet ships allowlist-gated |

## Monad Testnet (chain id 10143)

| Contract | Version | Address | Block | Status |
|---|---|---|---|---|
| Skrumpeys NFT | v1 | _set via `NEXT_PUBLIC_SKRUMPEY_CONTRACT`_ | — | Variable |

### Cosmic Casino (chain id 10143)

Deployed 2026-05-15 via CREATE3 from `contracts/casino/script/Deploy.s.sol`.
Source of truth: `contracts/casino/deployments/10143.json`.

| Contract | Version | Address | Status | Notes |
|---|---|---|---|---|
| CasinoBankroll | v1 | `0x33C5B6a95e71611F5dC821A74DDAD0F746fF2dFf` | Live | Shared liquidity pool, 0.02 MON seed, drawdown breaker armed (0.01 MON 24h cap) |
| CosmicFlip | v1 | `0x064b8bfc03b23D2b525deD9d3969090347A21983` | Live | Heads/tails, 1.98× payout, 1% house edge |
| GravityDice | v1 | `0xAC023542A8168465EE4A1b3e8Ae0f58F36A6d84B` | Live | Roll-under 2..98, 99/(R-1) multiplier |
| ConstellationClimb | v1 | `0xd9B9b6c37ad4f3D5b07ae76dE261c5C865600d6e` | Live | Hi-Lo session-based, 1.0 MON cashout cap |
| CasinoAllowlist | — | _not deployed_ | — | Testnet runs open-house; allowlist deploys mainnet-only |
| Deployer (1/1 owner) | EOA | `0xb29e6735629539cEd64F0d6f0c476Fe92539fD7B` | — | Phase 1; multisig migration at Phase 3 |
| CreateX singleton | — | `0xba5Ed099633D3B313e4D5F7bdc1305d3c28ba5Ed` | Live | Standard pcaversaccio rollout |

Explorer base: `https://testnet.monadscan.com/address/`.

## Environment variable mapping

These env vars are read at runtime and must match the table above:

| Variable | Default source |
|---|---|
| `NEXT_PUBLIC_SKRUMPEY_CONTRACT` | `lib/starSkrumpey.ts` |
| `NEXT_PUBLIC_GOVERNANCE_CONTRACT` | `lib/governance.ts` |
| `NEXT_PUBLIC_STAKING_CONTRACT` | `lib/governance.ts` |
| `NEXT_PUBLIC_MARKETPLACE_CONTRACT` | `lib/marketplace.ts` |
| `NEXT_PUBLIC_STARFORGE_CONTRACT` | (future) StarForgeV5 address |

## Version history

### StarForge

| Version | Source | Status | Reason archived |
|---|---|---|---|
| V1 | `contracts/archive/StarForge.sol` | Archived | Superseded by V2 — no VRF, chain randomness vulnerable |
| V2 | `contracts/archive/StarForgeV2.sol` | Archived | Superseded by V3 — pre-commit-reveal |
| V3 | `contracts/archive/StarForgeV3.sol` | Archived | Superseded by V4 — security fixes rolled forward |
| V4 | `contracts/archive/StarForgeV4.sol` | Archived | Superseded by V5 — provably fair refactor (see `docs/starforge-archive/STARFORGE_V3_FIX_16.md`) |
| V5 | `contracts/StarForgeV5.sol` | **Active** | Production-ready commit-reveal with AccessControl + Pausable |

Only `contracts/StarForgeV5.sol` is compiled (see `scripts/compile-contracts.js`).
The archived versions are kept for provenance, audit history, and on-chain
verification of prior deployments — not for deployment.

### Testing / legacy

| File | Status | Reason archived |
|---|---|---|
| `contracts/archive/Testing_casino.sol` | Archived | Non-production experimental contract |

## Update procedure

When deploying a new contract or version:

1. Deploy to Monad (see `TESTNET.md`, `DEPLOYMENT.md`).
2. Verify on monadscan.
3. Update the relevant row in this file with address + block.
4. Update the env-var table if a new `NEXT_PUBLIC_*` is introduced.
5. If a prior version is superseded, move its source to `contracts/archive/`
   and add a row under "Version history".
