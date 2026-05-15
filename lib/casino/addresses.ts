/**
 * Cosmic Casino — deployed contract addresses (Monad).
 *
 * Source of truth: `contracts/casino/deployments/<chainId>.json`.
 * The same `(deployer, salt)` tuple yields the same CREATE3 address on
 * Monad mainnet (143) and testnet (10143), so once a deploy lands on
 * testnet against a given deployer, the mainnet predictions are pinned.
 *
 * Update this file when contracts/casino/deployments/<chainId>.json changes.
 */

export interface CasinoAddresses {
  bankroll: `0x${string}`;
  cosmicFlip: `0x${string}`;
  gravityDice: `0x${string}`;
  constellationClimb: `0x${string}`;
  allowlist: `0x${string}` | null;
}

// Monad testnet (chain id 10143) — deployed 2026-05-15 via CREATE3.
// Deployer: 0xb29e6735629539cEd64F0d6f0c476Fe92539fD7B.
const MONAD_TESTNET_CASINO: CasinoAddresses = {
  bankroll:           '0x33C5B6a95e71611F5dC821A74DDAD0F746fF2dFf',
  cosmicFlip:         '0x064b8bfc03b23D2b525deD9d3969090347A21983',
  gravityDice:        '0xAC023542A8168465EE4A1b3e8Ae0f58F36A6d84B',
  constellationClimb: '0xd9B9b6c37ad4f3D5b07ae76dE261c5C865600d6e',
  allowlist:          null, // not deployed on testnet; CASINO_DEPLOY_ALLOWLIST=true to enable
};

// Monad mainnet (chain id 143) — not yet deployed. Predictions populated
// post-mainnet ceremony from contracts/casino/deployments/143.json.
const MONAD_MAINNET_CASINO: CasinoAddresses | null = null;

/**
 * Resolve the casino address book for a given chain id, or null when the
 * chain has no deploy yet. Caller should null-check and surface a friendly
 * "coming soon" message rather than rendering bet buttons.
 */
export function getCasinoAddresses(chainId: number): CasinoAddresses | null {
  switch (chainId) {
    case 10143:
      return MONAD_TESTNET_CASINO;
    case 143:
      return MONAD_MAINNET_CASINO;
    default:
      return null;
  }
}

/** True when at least the bankroll + a game is deployed for `chainId`. */
export function casinoIsLive(chainId: number): boolean {
  return getCasinoAddresses(chainId) !== null;
}
