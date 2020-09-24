import { DynamicModule, Module, Provider } from "@nestjs/common";

import { EStoreType } from "./enums";
import { IModuleOpts } from "./interfaces";
import {REMOTE_CONFIG_PROVIDER_TOKEN} from "./consts";
import { FirebaseRemoteConfigService } from "./service";


@Module({})
export class RemoteConfigModule {
  static register(options: IModuleOpts, global: boolean = false): DynamicModule {
    const provider: Provider = {
      provide: REMOTE_CONFIG_PROVIDER_TOKEN,
      useFactory: () => {
        if (options.store === EStoreType.FIREBASE) {
          return new FirebaseRemoteConfigService(options.opts);
        }
      },
    };

    return {
      global,
      module: RemoteConfigModule,
      providers: [provider],
      exports: [provider],
      controllers: [],
      imports: [],
    }
  }

  static registerForRoot(options: IModuleOpts): DynamicModule {
    return RemoteConfigModule.register(options, true);
  }
}
