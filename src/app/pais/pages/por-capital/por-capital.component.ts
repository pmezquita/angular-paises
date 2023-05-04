import {Component} from '@angular/core';
import {Country} from "../../interfaces/pais.interface";
import {PaisService} from "../../services/pais.service";

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styles: []
})
export class PorCapitalComponent {
  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];
  isLoading: boolean = false;

  constructor(private paisService: PaisService) {
  }

  buscar(termino: string) {
    this.termino = termino;
    this.hayError = false;
    this.isLoading = true;

    this.paisService.buscarCapital(termino)
      .subscribe(paises => {
          if (paises.length == 0) {
            this.hayError = true;
          }
          this.paises = paises;
          this.isLoading = false;
        }
      );
  }
}
