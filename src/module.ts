import { DynamicModule, Module, Provider } from "@nestjs/common";
import { EStoreType } from "./enums";
import { IModuleOpts } from "./interfaces";
import { FirebaseRemoteConfigService } from "./service";

const providerToken = 'RemoteConfigProviderToken';

@Module({})
export class RemoteConfigModule {
  static register(options: IModuleOpts): DynamicModule {
    const provider: Provider = {
      provide: providerToken,
      useFactory: () => {
        if (options.store === EStoreType.FIREBASE) {
          return new FirebaseRemoteConfigService(options.opts);
        }
      },
    };

    return {
      module: RemoteConfigModule,
      providers: [provider],
      exports: [provider],
    }
  }
}
