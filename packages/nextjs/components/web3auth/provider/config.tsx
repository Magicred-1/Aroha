import { CHAIN_NAMESPACES, WEB3AUTH_NETWORK} from "@web3auth/base";
import { XrplPrivateKeyProvider } from "@web3auth/xrpl-provider";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { AuthAdapter, WHITE_LABEL_THEME, WhiteLabelData } from "@web3auth/auth-adapter";
import { Web3AuthContextConfig } from "@web3auth/no-modal-react-hooks";

const clientId = process.env.NEXT_PUBLIC_CLIENT_ID_WEB3AUTH ?? 'BEHBx80k-JYOdHLtRlv_M7jqtjQt1ttpBm8w5S9F0oZQnquwpd4Il_zXFYgToNzz9uJ7XVBa7SVfAjj1PA1A4m8';

const chainConfig = {
    chainNamespace: CHAIN_NAMESPACES.XRPL,
    chainId: "0x2",
    // Avoid using public rpcTarget & wsTarget in production.
    // Use services like Infura, Quicknode etc
    rpcTarget: "https://testnet-ripple-node.tor.us",
    wsTarget: "wss://s.altnet.rippletest.net",
    ticker: "XRP",
    tickerName: "XRPL",
    displayName: "xrpl testnet",
    blockExplorerUrl: "https://testnet.xrpl.org",
  };

const web3AuthOptions = {
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  chainConfig,
};

const privateKeyProvider = new XrplPrivateKeyProvider({ config: { chainConfig } });

const web3auth = new Web3AuthNoModal({
    clientId,
    web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
    chainConfig,
    privateKeyProvider,
});

const authAdapter = new AuthAdapter({
  loginSettings: {
    mfaLevel: "mandatory", // default, optional, mandatory, none
  },
  adapterSettings: {
    uxMode: "redirect",
    loginConfig: {
      email_passwordless: {
        verifier: "edao-social-login2", // Pass your verifier name
        verifierSubIdentifier: "email",
        typeOfLogin: "email_passwordless",
        clientId, // Pass the Web3Auth `Client ID` here.
      },
      google: {
        verifier: "edao-social-login2", // Pass your verifier name
        verifierSubIdentifier: "google",
        typeOfLogin: "google",
        clientId: "51818039411-du7fd6nmrl888d0rnf9t7skha54cp8ud.apps.googleusercontent.com", // Pass the Google `Client ID` here.
      },
      jwt: {
        verifier: "edao-social-login2", // Pass the Verifier name here
        typeOfLogin: "jwt", // Pass on the login provider of the verifier you've created
        clientId: "hUVVf4SEsZT7syOiL0gLU9hFEtm2gQ6O", // Pass on the Auth0 `Client ID` here
      },
    },
    whiteLabel: {
      appName: "GRANT3D",
      appUrl: "https://xxxxxxx.com",
      logoLight: "https://app.grant3d.xyz/_next/image?url=%2Fgrant3d_logo.png&w=384&q=75",
      defaultLanguage: "en", // en, de, ja, ko, zh, es, fr, pt, nl, tr
      mode: "auto", // whether to enable dark mode. defaultValue: auto
      theme: {
        primary: "#00D1B2",
      } as WHITE_LABEL_THEME,
      useLogoLoader: true,
    } as WhiteLabelData,
  },
});

web3auth.configureAdapter(authAdapter);

web3auth.init();

export const web3AuthContextConfig: Web3AuthContextConfig = {
    web3AuthOptions,
    adapters: [authAdapter],
};