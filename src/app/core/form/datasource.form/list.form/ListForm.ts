import { Directive, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { CommandPanelVariant, FormOpeningMode, FormStatus } from "src/app/core/form/Form";
import { Utils } from "src/app/core/utils";
import { ReferenceInput } from "../../../../common/form/controls/reference";
import { AbstractListForm } from "src/app/core/form/datasource.form/list.form/AbstractListForm";
import { IObjectEntity } from "src/app/core/data/entity/object.entity/IObjectEntity";
import { IListEntity } from "src/app/core/data/entity/list.entity/IListEntity";



@Directive({})
export abstract class ListForm extends AbstractListForm{

  choicedRow:IObjectEntity|undefined

  private choiceMode:boolean = false
  private referenceInput:ReferenceInput|undefined

  override onCreateForm(): void {
    super.onCreateForm()
    this.choiceMode = Utils.getProperty(this.params, 'choiceMode', false)
    this.referenceInput = Utils.getProperty(this.params, 'referenceInput', undefined)
  }

  override getCommandPanelVariant(): CommandPanelVariant {
    if(this.choiceMode){
      return CommandPanelVariant.LIST_FROM_CHOICE_MODE
    }else{
      return CommandPanelVariant.LIST_FORM
    }
  }

  override select(){
    if(this.referenceInput != undefined && this.choicedRow != undefined){
      this.referenceInput.ref = this.referenceInput.entity_to_ref(this.choicedRow.data)
    }
  }

  override create(): void {
    this.formService.openForm(this.md.formProvider.getObjectForm(), FormOpeningMode.REGULAR)
  }

  @ViewChild(MatPaginator)
  paginator: MatPaginator|undefined;

  tableDataSource = new MatTableDataSource([])
  protected override setDataSource(dataTable: IListEntity): void {
    this.tableDataSource.data = <[]>dataTable.list
  }

  onPaginateChange(event:any){
    this.pageIndex = event.pageIndex
    this.pageSize = event.pageSize

    this.refresh()
  }

  onClickAtRow(row:IObjectEntity){
    if(this.choiceMode){
      this.choicedRow = row
      this.formEventNotify.next({owner:this, params:FormStatus.CHOICE_ITEM_SELECTED})
    }else{
      type obj_keys = keyof typeof row.data
      this.formService.openForm(this.md.formProvider.getObjectForm(),
        FormOpeningMode.REGULAR, {key: row.data[this.md.primary_key as obj_keys]})
    }
  }

  getDisplayedColumns():string[]{
    let columnNames:string[] = []
    for(let col of this.columns){
      if(col.is_hidden)
        continue
      columnNames.push(col.dataPath)
    }
    return columnNames
  }

}
