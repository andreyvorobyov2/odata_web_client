import { IFactory } from './factory/IFactory';
import { IRequestBuilder } from './request.builder/IRequestBuilder';


export interface IExternalData {
  factory: IFactory;
  requestBuilder: IRequestBuilder;
}
