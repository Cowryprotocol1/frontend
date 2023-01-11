
import { StellarWalletsKit, WalletNetwork, WalletType } from 'stellar-wallets-kit';

 export const kit = new StellarWalletsKit({
    network: WalletNetwork.TESTNET,
    selectedWallet: WalletType.FREIGHTER
  });

