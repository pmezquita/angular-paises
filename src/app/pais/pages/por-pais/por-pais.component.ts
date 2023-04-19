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

  get mostrarSugerencia() {
    return this.paisesSugeridos.length != 0;
  }

  constructor(private paisService: PaisService) {
  }

  buscar(termino: string) {
    this.termino = termino;
    this.hayError = false;
    this.paisesSugeridos = [];

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
    this.termino = termino;

    this.paisService.buscarPais(termino)
      .subscribe({
        next: paises => this.paisesSugeridos = paises.splice(0, 5),
        error: () => this.paisesSugeridos = []
      });
  }
}
