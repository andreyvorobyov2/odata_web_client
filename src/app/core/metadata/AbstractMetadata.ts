import { IAttribute, IForeignField, IMetadata, ITabularSection } from './IMetadata';
import { IFormProvider } from "../form/IFormProvider";
import { IRequestBuilderProvider } from "../data/request.builder/IRequestBuilderProvider";
import { IFactoryProvider } from "../data/factory/IFactoryProvider";


export abstract class AbstractMetadata implements IMetadata {
  presentation: string = ''
  primary_key: string = ''

  attributes: IAttribute[] = []

  tabular_sections: ITabularSection[] = []
  foreign_keys: Map<string, IForeignField> = new Map<string, IForeignField>()

  className: string = ''

  abstract factoryProvider: IFactoryProvider
  abstract formProvider: IFormProvider
  abstract requestBuilderProvider: IRequestBuilderProvider
}
