import { Component } from "@angular/core";
import { CommandPanelVariant, Form } from "src/app/core/form/Form";
import { DefaultObjectForm } from "../object/DefaultObjectForm";
import { IEntity } from "src/app/core/data/entity/IEntity";
import { ITabularSectionRowForm } from "./ITabularSectionRowForm";
import { Utils } from "src/app/core/utils";


@Component({
  templateUrl:'../object/default.edit.object.html',
  styleUrls:['../object/default.object.css'],
})
export class DefaultTabularSectionRowForm extends Form implements ITabularSectionRowForm{

  override title: string = 'default.add.row.form'

  wrapper: DefaultObjectForm = new DefaultObjectForm()

  dataSource: any

  private tableDataSource: any
  private rowIndex: number = -1;

  override getCommandPanelVariant(): CommandPanelVariant {
    return CommandPanelVariant.TABULAR_SECTION_ROW
  }

  ok(){
    if(this.rowIndex > -1){
      this.editRow()
    }else{
      this.addRow()
    }
  }

  private addRow(): void {
    let _data = <IEntity[]> this.tableDataSource.data
    _data.push(this.dataSource.data)
    this.tableDataSource.data = _data
  }

  private editRow(): void {
    let _data = <IEntity[]>this.tableDataSource.data;
    _data.splice(this.rowIndex, 1, this.dataSource.data)
    this.tableDataSource.data = _data;
  }

  override onCreateForm(): void {
    this.wrapper.attributes = this.md.attributes === undefined ? [] : this.md.attributes

    this.dataSource = this.md.factoryProvider.getObjectFactory().createEmptyObject()
    this.tableDataSource = this.params.tableDataSource

    if(Utils.propertyIsFilled(this.params,'new_LineNumber')){
      this.dataSource.data['LineNumber'] = this.params.new_LineNumber
    }

    if(Utils.propertyIsFilled(this.params,'rowIndex')){
      this.rowIndex = this.params.rowIndex
      this.dataSource.data = this.params.row
    }

    this.wrapper.setDataSource(this.dataSource)
  }
}


