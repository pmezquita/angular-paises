import {Component} from '@angular/core';
import {PaisService} from "../../services/pais.service";
import {Country} from "../../interfaces/pais.interface";

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: []
})
export class PorPaisComponent {
  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];

  constructor(private paisService: PaisService) {
  }

  buscar(termino: string) {
    this.termino = termino;
    this.hayError = false;

    this.paisService.buscarPais(termino)
      .subscribe({
        next: paises => {
          this.paises = paises
        }, error: () => {
          this.hayError = true;
          this.paises = [];
        }
      });
  }

  sugerencias(termino: string) {
    this.hayError = false;
    console.log(termino);
  }
}
