import { DataSource } from './DataSource';
export abstract class DataSourceAdapter implements DataSource {
    abstract fetchData(): Promise<any>;
}