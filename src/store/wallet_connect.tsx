
import { StellarWalletsKit, WalletNetwork, WalletType } from 'stellar-wallets-kit';

 export const kit = new StellarWalletsKit({
    network: WalletNetwork.TESTNET,
    selectedWallet: WalletType.FREIGHTER
  });



  //   const start = async() => {
//     try{
//     // const x = await kit.startWalletConnect({
//     //   name: 'cowry_protocol_test',
//     //   description: 'CowryProtocol',
//     //   url: 'www.cowryprotocol.io',
//     //   icons: [
//     //     'URL_OF_ICON'
//     //   ],
//     //   projectId: 'e88a7e4dfc35d013e398f9d21cd140d8',
//     // })
//     const wallets = await kit.getSupportedWallets()
//     const y = await kit.getPublicKey()
//     console.log(y, "xxxx")
//     } catch(e){
//         console.log(e)
//     }
// }