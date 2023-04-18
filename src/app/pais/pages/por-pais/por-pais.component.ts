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
  resultados: Country[] = [];

  constructor(private paisService: PaisService) {
  }

  buscar() {
    this.hayError = false;
    console.log(this.termino);

    this.paisService.buscarPais(this.termino)
      .subscribe({
        next: paises => {
          this.resultados = paises
        }, error: () => {
          this.hayError = true;
        }
      });
  }
}
