import { CommandPanelVariant } from './Form';
import { Observable } from 'rxjs';
import { IMetadata } from '../metadata/IMetadata';
import { IFormEventNotifyParameters } from "./IFormEventNotifyParameters";


export interface IForm {
  title: string
  params: any
  md: IMetadata
  loading: boolean
  getCommandPanelVariant(): CommandPanelVariant
  onCreateForm(): void
  onFormEventNotify: Observable<IFormEventNotifyParameters>
  close(): void
}
