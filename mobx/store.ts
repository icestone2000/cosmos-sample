import { makeAutoObservable, action } from 'mobx';
import { DataSourceConfigManager } from './DataSourceConfigManager';
import { DataSource } from './DataSource';
import { Chain, Chains, Asset, AssetList } from '@chain-registry/types';

interface AssetItem {
  tokenAmount: string;
  tokenAmountPrice: string;
  name: string; // asset name
}

class ChainAssetStore {
  dataSource: DataSource | null = null;
  config: any = null;
  isLoading: boolean = false;
  isError: boolean = false;

  chains: Chains = [];
  assets: Asset[] = [];
  assetItems: AssetItem[] = [];
  assetLists: { [chainName: string]: Asset[] } = {};

  constructor() {
    makeAutoObservable(this);
  }

  setConfig(config: any) {
    this.config = config;
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
  }

  async fetchData(): Promise<void> {
    try {
      this.isLoading = true;
      this.isError = false;
      const manager = await DataSourceConfigManager.getInstance(this.config);
      this.dataSource = manager.getDataSource();
      const fetchedData = await this.dataSource?.fetchData() || null;
      if (fetchedData) {
        this.chains = fetchedData.chains;
        if(fetchedData.assetLists) {
          for (const chainName in fetchedData.assetLists) {
            this.addAssetList(chainName, fetchedData.assetLists[chainName]);
          }
        }
        this.assetItems = fetchedData.assetItems;
      }
    } catch (error) {
      this.isError = true;
    } finally {
      this.isLoading = false;
    }
  }
}

export default new ChainAssetStore();