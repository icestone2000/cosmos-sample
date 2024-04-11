import { makeAutoObservable, action } from 'mobx';
import { Chain, Chains, Asset, AssetList } from '@chain-registry/types';

interface AssetItem {
  tokenAmount: string;
  tokenAmountPrice: string;
  name: string; // asset name
}

class ChainAssetStore {
  chains: Chains = [];
  assets: Asset[] = [];
  assetItems: AssetItem[] = [];
  assetLists: { [chainName: string]: Asset[] } = {};

  constructor() {
    makeAutoObservable(this);
  }

  addChain(chain: Chain) {
    this.chains.push(chain);
  }

  addAssetList(chainName: string, assetList: AssetList) {
    this.assetLists[chainName] = assetList.assets;
    this.assets.push(...assetList.assets);
  }

  addAssetItem(assetItem: AssetItem) {
    this.assetItems.push(assetItem);
  }

  getAssetItems(): AssetItem[] {
    return this.assetItems;
  }

  findAssetByName(name: string): Asset | undefined {
    return this.assets.find(asset => asset.name === name);
  }

  findAssetsByChain(chainName: string): Asset[] {
    if (!this.assetLists[chainName]) {
      return [];
    }
    return this.assetLists[chainName];
    /*return this.assets.filter(asset => {
        if (!asset.traces) {
            return false
        }
        for (const trace of asset.traces) {
            if (trace.counterparty && trace.counterparty.chain_name === chainName) {
            return true;
            }
        }
        return true;
    });*/
  }
}

export default new ChainAssetStore();