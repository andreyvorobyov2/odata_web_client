import { Component, Input, inject } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { IEntity } from "src/app/core/data/entity/IEntity";
import { IListEntity } from "src/app/core/data/entity/list.entity/IListEntity";
import { IObjectEntity } from "src/app/core/data/entity/object.entity/IObjectEntity";
import { FormOpeningMode } from "src/app/core/form/Form";
import { FormService } from "src/app/core/form/FormService";
import { ITabularSectionFormControl } from "./ITabularSectionFormControl";
import { IMetadata } from "src/app/core/metadata/IMetadata";
import { Utils } from "src/app/core/utils";


@Component({
  selector: 'tabular-section',
  templateUrl: './tabular.section.html',
  styleUrls: ['./tabular.section.css']
})
export class TabularSection {

  private _definition: ITabularSectionFormControl | undefined;
  @Input() set definition(value: ITabularSectionFormControl | undefined) {
    if (value != undefined) {

      // @ts-ignore
      const owner_data = value.owner.dataSource.data

      if(! Utils.propertyIsFilled(owner_data, value.tabular_section.name)){
         owner_data[value.tabular_section.name] = []
      }

      this.tableDataSource.data = owner_data[value.tabular_section.name]

      this._definition = value;
    }
  }

  get definition(): ITabularSectionFormControl | undefined {
    return this._definition;
  }

  tableDataSource = new MatTableDataSource();

  expanded_row: any | null = null;

  private formService: FormService = inject(FormService);

  getColumnsToDisplay() {
    if (this.definition === undefined) { return []; }
    return this.definition.columns_to_display;
  }

  getColumnsToDisplayWithExpand() {
    if (this.definition === undefined) { return []; }
    const data_paths: string[] = [];
    this.definition.columns_to_display.forEach(i => data_paths.push(i.dataPath));
    return ['expand', ...data_paths];
  }

  get_fetched_data(row: IEntity, dataPath: string) {
    if (this.definition === undefined) { return ''; }
    return this.definition.owner.get_fetched_data(row, dataPath, this.definition.tabular_section.table_md);
  }

  add_row() {
    if (this.definition === undefined) { return; }
    const md: IMetadata = this.definition.tabular_section.table_md;

    this.formService.openForm(md.formProvider.getRowForm(),
      FormOpeningMode.REGULAR, {
      new_LineNumber: this.tableDataSource.data.length + 1,
      tableDataSource: this.tableDataSource
    });
  }

  clear_all_rows() {
    this.tableDataSource.data = [];
  }

  edit_row(row: IEntity) {
    if (this.definition === undefined) { return; }
    const md: IMetadata = this.definition.tabular_section.table_md;

    this.modify_row(row, (index: number, data: IEntity[]) => {

      this.formService.openForm(md.formProvider.getRowForm(),
        FormOpeningMode.REGULAR, {
        row: data[index],
        rowIndex: index,
        tableDataSource: this.tableDataSource
      });
    });
  }

  copy_row(row: IEntity) {
    if (this.definition === undefined) { return; }
    const md: IMetadata = this.definition.tabular_section.table_md;

    this.modify_row(row, (index: number, data: IEntity[]) => {
      const normalized_data = {};
      data[index].normalizeData(normalized_data, data[index], md);
      const new_row: IObjectEntity | IListEntity = md.factoryProvider.getObjectFactory().createFilledInstance(normalized_data);

      data.splice(index, 0, (new_row as IObjectEntity).data);
    });
  }

  delete_row(row: IEntity) {
    this.modify_row(row, (index: number, data: IEntity[]) => {
      data.splice(index, 1);
    });
  }

  up_row(row: IEntity) {
    this.modify_row(row, (index: number, data: IEntity[]) => {
      let tmp1 = data[index];
      let tmp2 = data[index - 1];
      data.splice(index - 1, 2, ...[tmp1, tmp2]);
      this.expanded_row = tmp1;
    });
  }

  down_row(row: IEntity) {
    this.modify_row(row, (index: number, data: IEntity[]) => {
      let tmp1 = data[index];
      let tmp2 = data[index + 1];
      data.splice(index, 2, ...[tmp2, tmp1]);
      this.expanded_row = tmp1;
    });
  }

  private modify_row(row: IEntity, fn: (index: number, data: IEntity[]) => void) {
    let _data = <IEntity[]>this.tableDataSource.data;
    let index = _data.findIndex(i => i === row);
    if (index > -1) {
      fn(index, _data);
    }
    // recalculate line number
    let ln = 1;
    _data.forEach(i => {
      // @ts-ignore
      i.LineNumber = ln.toString();
      ln += 1;
    });
    this.tableDataSource.data = _data;
  }
}
