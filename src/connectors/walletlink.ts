import {WalletLinkConnector} from "@web3-react/walletlink-connector";

export const walletlink= new WalletLinkConnector({
    url:"https://mainnet.infura.io/v3/749bb12c1a35410686d0a338b91313fa",
    appName:"Mint Bored Lion Apes NFT",
    supportedChainIds:[1]
})