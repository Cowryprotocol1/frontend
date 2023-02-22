
import { StellarWalletsKit, WalletNetwork, WalletType } from 'stellar-wallets-kit';

async function walletConnectAll( wallet:string){
  //should take wallet connect variable
  //connect to user wallet
  // be able to sign tx
  let x;
  switch (wallet) {
    case "XBULL":
      x = WalletType.XBULL
      break;
    case "ALBEDO":
      x = WalletType.ALBEDO
      break;
    case "RABET":
      x = WalletType.RABET
      break;
    case "WALLET_CONNECT":
      x = WalletType.WALLET_CONNECT
      break;
    case "FREIGHTER":
      x = WalletType.FREIGHTER
      break;
  }

  const kit = new StellarWalletsKit({
    network: WalletNetwork.TESTNET,
    selectedWallet: x
  });
  return kit
}

export default walletConnectAll;