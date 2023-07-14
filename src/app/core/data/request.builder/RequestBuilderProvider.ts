
import { IRequestBuilderProvider } from "src/app/core/data/request.builder/IRequestBuilderProvider";
import { Activator } from "../../Activator";
import { IRequestBuilder } from "src/app/core/data/request.builder/IRequestBuilder";


export class RequestBuilderProvider implements IRequestBuilderProvider {
  constructor(private requestBuilderClass: any, private odataResource: string | undefined) { }

  getRequestBuilder(): IRequestBuilder {
    if (this.requestBuilderClass === undefined)
      throw Error('request builder class is undefined');
    let requestBuilder: IRequestBuilder = Activator.create(this.requestBuilderClass);
    if (this.odataResource != undefined)
      requestBuilder.odata_resource(this.odataResource);

    return requestBuilder;
  }
}
