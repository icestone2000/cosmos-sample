export interface DataSource {
    fetchData: () => Promise<any>;
}