import "../styles/globals.css";
import "@interchain-ui/react/styles";

import type { AppProps } from "next/app";
import React, { useEffect } from 'react'
import { SignerOptions, wallets } from "cosmos-kit";
import { ChainProvider } from "@cosmos-kit/react";
import { assets, chains } from "chain-registry";
import { Chain, Chains, Asset, AssetList } from '@chain-registry/types';
import store from '../mobx/store';
import { Provider } from "mobx-react";
import {
  Box,
  ThemeProvider,
  useColorModeValue,
  useTheme,
} from "@interchain-ui/react";

let dataLoaded = false;
function CreateCosmosApp({ Component, pageProps }: AppProps) {
  const { themeClass } = useTheme();

  const signerOptions: SignerOptions = {
    // signingStargate: () => {
    //   return getSigningCosmosClientOptions();
    // }
  };
  useEffect(() => {
    if (!dataLoaded) {
      // Add chains for cosmoshub, osmosis, terra-classic, teritori
      store.addChain({
        chain_id: 'cosmoshub-1',
        chain_name: 'cosmoshub',
        pretty_name: 'Cosmos Hub',
        status: 'active',
        network_type: 'cosmos',
        bech32_prefix: 'cosmos',
        slip44: 118,
      });
      store.addChain({
        chain_id: 'osmosis-1',
        chain_name: 'Osmosis',
        pretty_name: 'Osmosis',
        status: 'active',
        network_type: 'cosmos',
        bech32_prefix: 'cosmos',
        slip44: 118,
      });
      store.addChain({
        chain_id: 'terra-classic-1',
        chain_name: 'Terra Classic',
        pretty_name: 'Terra Classic',
        status: 'active',
        network_type: 'cosmos',
        bech32_prefix: 'cosmos',
        slip44: 118,
      });
      store.addChain({
        chain_id: 'teritori-1',
        chain_name: 'Teritori',
        pretty_name: 'Teritori',
        status: 'active',
        network_type: 'cosmos',
        bech32_prefix: 'cosmos',
        slip44: 118,
      });

      // Add assets for cosmoshub
      store.addAssetList('cosmoshub', {
        $schema: 'http://json-schema.org/draft-07/schema#',
        chain_name: 'cosmoshub',
        assets: [
          {
            name: 'ATOM',
            display: 'atom',
            denom_units: [{ denom: 'ibc/C4CFF46FD6DE35CA4CF4CE031E643C8FDC9BA4B99AE598E9B0ED98FE3A2319F9', exponent: 0 }],
            logo_URIs: {
              png: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.png',
            },
            base: 'ibc/C4CFF46FD6DE35CA4CF4CE031E643C8FDC9BA4B99AE598E9B0ED98FE3A2319F9',
            symbol: 'ATOM'
          },
        ]});
      // Add assets for Osmosis
      store.addAssetList('Osmosis', {
        $schema: 'http://json-schema.org/draft-07/schema#',
        chain_name: 'Osmosis',
        assets: [
          {
            name: 'Osmosis',
            display: 'osmo',
            denom_units: [{ denom: 'ibc/ED07A3391A112B175915CD8FAF43A2DA8E4790EDE12566649D0C2F97716B8518', exponent: 0 }],
            logo_URIs: {
              png: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.png',
            },
            base: 'ibc/ED07A3391A112B175915CD8FAF43A2DA8E4790EDE12566649D0C2F97716B8518',
            symbol: 'OSMO'
          },
        ]});
      // Add assets for Terra Classic
      store.addAssetList('Terra Classic', {
        $schema: 'http://json-schema.org/draft-07/schema#',
        chain_name: 'Terra Classic',
        assets: [
          {
            //id: 1,
            name: 'Terra Classic',
            display: 'Terra Classic',
            denom_units: [{ denom: 'ustc', exponent: 0 }],
            logo_URIs: {
              png: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/terra/images/ust.png',
            },
            base: 'ustc',
            symbol: 'USTC'
          },
        ]
      });
      // Add assets for Teritori
      store.addAssetList('Teritori', {
        $schema: 'http://json-schema.org/draft-07/schema#',
        chain_name: 'Teritori',
        assets: [
          { 
            //id: 1,
            name: 'Teritori',
            display: 'Teritori',
            denom_units: [{ denom: 'tori', exponent: 0 }],
            logo_URIs: {
              png: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/teritori/images/utori.png',
            },
            base: 'tori',
            symbol: 'TORI'
          }
        ]
      });
      store.addAssetItem({name:"ATOM", tokenAmount: "10.2", tokenAmountPrice: "80.3"});
      store.addAssetItem({name:"Osmosis", tokenAmount: "5", tokenAmountPrice: "4.6"});
      store.addAssetItem({name:"Terra Classic", tokenAmount: "10.2", tokenAmountPrice: "80.3"});
      store.addAssetItem({name:"Teritori", tokenAmount: "10", tokenAmountPrice: "100"});
      dataLoaded = true;
    }
  }, []);

  return (
    <Provider store={store}>
    <ThemeProvider>
      <ChainProvider
        chains={chains}
        assetLists={assets}
        wallets={wallets}
        walletConnectOptions={{
          signClient: {
            projectId: "a8510432ebb71e6948cfd6cde54b70f7",
            relayUrl: "wss://relay.walletconnect.org",
            metadata: {
              name: "CosmosKit Template",
              description: "CosmosKit dapp template",
              url: "https://docs.cosmology.zone/cosmos-kit/",
              icons: [],
            },
          },
        }}
        // @ts-ignore
        signerOptions={signerOptions}
      >
        <Box
          className={themeClass}
          minHeight="100dvh"
          backgroundColor={useColorModeValue("$white", "$background")}
        >
          {/* TODO fix type error */}
          {/* @ts-ignore */}
          <Component {...pageProps} />
        </Box>
      </ChainProvider>
    </ThemeProvider>
    </Provider>
  );
}

export default CreateCosmosApp;
