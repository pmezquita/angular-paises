import {Component} from '@angular/core';
import {PaisService} from "../../services/pais.service";
import {Country} from "../../interfaces/pais.interface";

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [`
    li {
      cursor: pointer;
    }
  `]
})
export class PorPaisComponent {
  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];
  paisesSugeridos: Country[] = [];
  isLoading = false;

  get mostrarSugerencia() {
    return this.paisesSugeridos.length != 0;
  }

  constructor(private paisService: PaisService) {
  }

  buscar(termino: string) {
    this.termino = termino;
    this.hayError = false;
    this.paisesSugeridos = [];
    this.isLoading = true;

    this.paisService.buscarPais(termino)
      .subscribe(paises => {
          if (paises.length == 0) {
            this.hayError = true;
          }
          this.paises = paises;
        this.isLoading = false;
        }
      );
  }

  sugerencias(termino: string) {
    this.hayError = false;
    this.termino = termino;

    this.paisService.buscarPais(termino)
      .subscribe(
        paises => {
          if (paises.length == 0) {
            this.hayError = true;
          }
          return this.paisesSugeridos = paises.splice(0, 5);
        });
  }
}
