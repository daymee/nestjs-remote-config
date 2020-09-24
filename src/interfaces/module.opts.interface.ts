import { EStoreType } from "../enums/store.type.enum";
import { IFirebaseOpts } from "./firebase.store.opts";

export interface IModuleOpts {
  store: EStoreType,
  opts: IFirebaseOpts | any,
}
