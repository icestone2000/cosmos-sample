import { DataSourceAdapter } from './DataSourceAdapter';
export class DataSourceProviderChainClient extends DataSourceAdapter {
    async fetchData(): Promise<any> {
        /*
          // TODO: Implement real fetchData() method
        try {
          const response = await fetch(this.apiUrl);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
          } catch (error) {
              console.error('Fetch data error:', error);
              throw error;
          }*/
          
        // Use mock data for now
        const data = {
          chains: [
              {
                  chain_id: 'cosmoshub-1',
                  chain_name: 'cosmoshub',
                  pretty_name: 'Cosmos Hub',
                  status: 'active',
                  network_type: 'cosmos',
                  bech32_prefix: 'cosmos',
                  slip44: 118,
              },
              {
                  chain_id: 'osmosis-1',
                  chain_name: 'Osmosis',
                  pretty_name: 'Osmosis',
                  status: 'active',
                  network_type: 'cosmos',
                  bech32_prefix: 'cosmos',
                  slip44: 118,
              },
              {
                  chain_id: 'terra-classic-1',
                  chain_name: 'Terra Classic',
                  pretty_name: 'Terra Classic',
                  status: 'active',
                  network_type: 'cosmos',
                  bech32_prefix: 'cosmos',
                  slip44: 118,
              },
              {
                  chain_id: 'teritori-1',
                  chain_name: 'Teritori',
                  pretty_name: 'Teritori',
                  status: 'active',
                  network_type: 'cosmos',
                  bech32_prefix: 'cosmos',
                  slip44: 118,
              }],
          assetLists: {
              'cosmoshub': {
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
                  ]
              },
              'Osmosis': {
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
                  ]
              },
              'Terra Classic': {
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
              },
              'Teritori': {
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
              }
          },
          assetItems: [
              {name:"ATOM", tokenAmount: "10.2", tokenAmountPrice: "80.3"},
              {name:"Osmosis", tokenAmount: "5", tokenAmountPrice: "4.6"},
              {name:"Terra Classic", tokenAmount: "10.2", tokenAmountPrice: "80.3"},
              {name:"Teritori", tokenAmount: "10", tokenAmountPrice: "100"}
          ]
        };
        return new Promise((resolve) => {
          resolve(data);
        });
      }
}