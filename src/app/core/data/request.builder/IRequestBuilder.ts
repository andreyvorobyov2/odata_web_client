
export interface IRequestBuilder {
  pageIndex(value: number): IRequestBuilder;
  pageSize(value: number): IRequestBuilder;

  appendToUrl(value: string): IRequestBuilder;
  select(value: string | string[]): IRequestBuilder;
  search(value: string, property: string): IRequestBuilder;
  requestForTotalRecords(): IRequestBuilder;

  getEntity(key: string): IRequestBuilder;

  getParams(): any;

  getUrl(): string; // url for GET request
  patchUrl(): string; // url for PATCH request
  postUrl(): string; // url for POST request

  odata_resource(value: string): IRequestBuilder;
  odata_select(value: string[]): IRequestBuilder;
  odata_expand(value: string[]): IRequestBuilder;
}
