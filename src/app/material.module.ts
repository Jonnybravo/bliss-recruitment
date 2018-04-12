import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatInputModule,
  MatPaginatorModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatPaginatorModule
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatPaginatorModule
  ]
})
export class MaterialModule {}
