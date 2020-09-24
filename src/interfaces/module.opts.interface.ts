import { EStoreType } from "../enums";
import { IFirebaseOpts } from "./firebase.store.opts";

export interface IModuleOpts {
  store: EStoreType,
  opts?: IFirebaseOpts | any,
}
