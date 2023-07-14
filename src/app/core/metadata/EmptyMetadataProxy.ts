
import { IMetadata } from "./IMetadata"
import { EmptyMetadata } from "./EmptyMetadata"

  export class EmptyMetadataProxy{
    private static _instance:IMetadata|undefined = undefined
    static getInstance():IMetadata{
      if(EmptyMetadataProxy._instance === undefined){
        EmptyMetadataProxy._instance = new EmptyMetadata()
      }
      return EmptyMetadataProxy._instance
    }
  }


