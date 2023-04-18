import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PorCapitalComponent} from './pages/por-capital/por-capital.component';
import {PorPaisComponent} from './pages/por-pais/por-pais.component';
import {PorRegionComponent} from './pages/por-region/por-region.component';
import {VerPaisComponent} from './pages/ver-pais/ver-pais.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    PorCapitalComponent,
    PorPaisComponent,
    PorRegionComponent,
    VerPaisComponent,
  ],
  exports: [
    PorCapitalComponent,
    PorPaisComponent,
    PorRegionComponent,
    VerPaisComponent,
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class PaisModule {
}
