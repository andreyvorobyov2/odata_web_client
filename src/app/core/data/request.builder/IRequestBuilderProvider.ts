import { IRequestBuilder } from './IRequestBuilder';


export interface IRequestBuilderProvider {
  getRequestBuilder(): IRequestBuilder;
}
