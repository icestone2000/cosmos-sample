import { DataSource } from './DataSource';
import { DataSourceProviderChainRegistry } from './DataSourceProviderChainRegistry';
import { DataSourceProviderChainClient } from './DataSourceProviderChainClient';
export class DataSourceConfigManager {
    private static instance: DataSourceConfigManager;
    dataSourceConfig: { provider: string };
    dataSource: DataSource | null = null;
  
    private constructor(config: { provider: string }) {
      this.dataSourceConfig = config;
    }
  
    static async getInstance(config: { provider: string }): Promise<DataSourceConfigManager> {
      if (!DataSourceConfigManager.instance) {
        DataSourceConfigManager.instance = new DataSourceConfigManager(config);
        await DataSourceConfigManager.instance.loadDataSource();
      }
      return DataSourceConfigManager.instance;
    }
  
    private async loadDataSource(): Promise<void> {
      switch (this.dataSourceConfig.provider) {
        case 'chain-registry':
          this.dataSource = new DataSourceProviderChainRegistry();
          break;
        case '@chain-registry/client':
          this.dataSource = new DataSourceProviderChainClient();
          break;
        default:
          throw new Error('Unsupported data source provider');
      }
    }
  
    getDataSource(): DataSource {
      if (!this.dataSource) {
        throw new Error('Data source not initialized');
      }
      return this.dataSource;
    }
  }