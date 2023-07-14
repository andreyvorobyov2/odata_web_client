import { IObjectForm } from "src/app/core/form/datasource.form/object.form/IObjectForm";
import { IColumn, ITabularSection } from "src/app/core/metadata/IMetadata";


export interface ITabularSectionFormControl {
  owner: IObjectForm
  tabular_section: ITabularSection
  columns_to_display: IColumn[]
}
