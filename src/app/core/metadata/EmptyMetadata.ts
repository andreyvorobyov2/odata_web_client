import { IFactoryProvider } from "../data/factory/IFactoryProvider";
import { IClassResolver } from "./IClassResolver";
import { Metadata } from "./Metadata";
import { EmptyFactoryProvider } from "../data/factory/EmptyFactoryProvider";


export class EmptyMetadata extends Metadata {
  protected override resolveClasses(): IClassResolver {
    return {metadataClassName: EmptyMetadata.name};
  }
  override factoryProvider: IFactoryProvider = new EmptyFactoryProvider();
}
