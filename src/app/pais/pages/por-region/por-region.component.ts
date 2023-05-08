import {Component, OnInit} from '@angular/core';
import {PaisService} from "../../services/pais.service";
import {Country} from "../../interfaces/pais.interface";
import {Region} from "../../interfaces/region.type";

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [`
    button {
      margin-right: 5px;
      margin-bottom: 5px;
    }
  `]
})
export class PorRegionComponent implements OnInit {

  regiones: Region[] = ['africa', 'americas', 'asia', 'europe', 'oceania'];
  regionActiva: Region = '';
  paises: Country[] = [];
  isLoading: boolean = false;

  constructor(private paisService: PaisService) {
  }

  ngOnInit(): void {
    this.regionActiva = this.paisService.cacheStore.byRegion.region ?? '';
    this.paises = this.paisService.cacheStore.byRegion.paises;
  }

  activarRegion = (region: Region) => {
    if (region == this.regionActiva) return;

    this.regionActiva = region;
    this.paises = [];
    this.buscar(region);
  }

  getClaseCSS = (region: string): string =>
    (region == this.regionActiva) ? 'btn btn-outline-primary' : 'btn'

  buscar(region: Region) {
    this.isLoading = true;
    this.paisService.buscarRegion(region)
      .subscribe(paises => {
        this.isLoading = false;
        return this.paises = paises;
      });
  }

}
