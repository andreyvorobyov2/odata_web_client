import { IFactoryProvider } from "src/app/core/data/factory/IFactoryProvider";
import { IFormProvider } from "src/app/core/form/IFormProvider";
import { AbstractMetadata } from "src/app/core/metadata/AbstractMetadata";
import { FactoryProvider } from "../data/factory/FactoryProvider";
import { FormProvider } from "../form/FormProvider";
import { RequestBuilderProvider } from "../data/request.builder/RequestBuilderProvider";
import { IRequestBuilderProvider } from "src/app/core/data/request.builder/IRequestBuilderProvider";
import { IClassResolver } from "./IClassResolver";
import { IMetadata } from "./IMetadata";
import *  as metadata from "../../app.metadata"

export abstract class Metadata extends AbstractMetadata{
  protected abstract resolveClasses():IClassResolver

  private resolve:IClassResolver = this.resolveClasses()

  static instances:Map<string, IMetadata> = new Map()
  static createInstance(className:string):IMetadata{
    const instance:IMetadata | undefined = Metadata.instances.get(className)
    if(instance === undefined){
      const new_instance = new metadata[className as keyof typeof metadata]
      Metadata.instances.set(className, new_instance)
      return new_instance
    }
    return instance
  }

  constructor(){
    super()
    this.className = this.resolve.metadataClassName
  }

  override requestBuilderProvider: IRequestBuilderProvider = new RequestBuilderProvider(
    this.resolve.requestBuilderClass,
    this.resolve.odataResource)

  override factoryProvider: IFactoryProvider =  new FactoryProvider(
    this.resolve.objectClass,
    this.resolve.listClass)

  override formProvider: IFormProvider = new FormProvider(
    this.resolve.metadataClassName,

    this.resolve.listForm,
    this.resolve.objectForm,

    this.resolve.rowForm)
}
