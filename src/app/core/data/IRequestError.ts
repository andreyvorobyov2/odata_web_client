import { HttpErrorResponse } from "@angular/common/http";



export interface IRequestError {
  error: HttpErrorResponse;
  requestId: string;
}
