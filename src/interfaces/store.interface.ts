export interface IRemoteConfigStore {
  getConfig<T>(namespace: string, key: string): T;
}
