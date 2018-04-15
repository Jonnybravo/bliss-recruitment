import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatInputModule,
  MatPaginatorModule,
  MatDialogModule,
  MatCardModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatPaginatorModule,
    MatDialogModule,
    MatCardModule
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatPaginatorModule,
    MatDialogModule,
    MatCardModule
  ]
})
export class MaterialModule {}
