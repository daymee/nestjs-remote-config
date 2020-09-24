import { Injectable, OnModuleInit, Scope } from "@nestjs/common";
import { Firestore, Settings } from '@google-cloud/firestore';

import { IFirebaseOpts } from "./interfaces/firebase.store.opts";
import { IRemoteConfigStore } from "./interfaces/store.interface";

@Injectable({
  scope: Scope.REQUEST,
})
export class FirebaseRemoteConfigService implements IRemoteConfigStore, OnModuleInit {
  private firestore: Firestore;
  private config: any = {};

  constructor(opts: IFirebaseOpts | Settings) {
    this.firestore = new Firestore(opts);
    this.fetchConfig();
  }

  private async fetchConfig() {
    const collection = await this.firestore.collection('configuration');
    setTimeout(() => {
      collection.onSnapshot(async () => {
        this.setupConfig(collection);
      });
    }, 0)

    this.setupConfig(collection);
  }

  onModuleInit() {
    this.fetchConfig();
  }

  getConfig<T>(namespace: string, key: string): T {
    return this.config[namespace] ? this.config[namespace][key] as T : undefined;
  }

  private async setupConfig(collection) {
    const snapshot = await collection.get();
    snapshot.docs.map(doc => {
      this.config[doc.id] = doc.data();
    });
  }
}
