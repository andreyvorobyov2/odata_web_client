import { NgModule } from "@angular/core";

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';

@NgModule({

  imports: [
    MatTabsModule,
    MatPaginatorModule,
    MatSortModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatSelectModule,
    MatButtonModule,
    MatGridListModule,
    MatExpansionModule,
    MatTableModule,
    MatCardModule,
    MatProgressBarModule,
    MatDividerModule,
    MatListModule,
    MatInputModule,
    MatMenuModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSnackBarModule,
    MatStepperModule,
  ],
  exports: [
    MatTabsModule,
    MatPaginatorModule,
    MatSortModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatSelectModule,
    MatButtonModule,
    MatGridListModule,
    MatExpansionModule,
    MatTableModule,
    MatCardModule,
    MatProgressBarModule,
    MatDividerModule,
    MatListModule,
    MatInputModule,
    MatMenuModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSnackBarModule,
    MatStepperModule,
  ],
  providers:[MatSnackBar],

})
export class MaterialModule { }
