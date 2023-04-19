import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PaisService} from "../../services/pais.service";
import {switchMap} from "rxjs";

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: []
})
export class VerPaisComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private paisSrvice: PaisService,
  ) {
  }

  ngOnInit(): void {

    this.activatedRoute.params
      .pipe(
        switchMap(({id}) => this.paisSrvice.getPaisPorCode(id))
      )
      .subscribe(paises => {
        console.log(paises[0]);
      });

    // this.activatedRoute.params
    //   .subscribe(({id}) => {
    //     console.log(id);
    //
    //     this.paisSrvice.getPaisPorCode(id)
    //       .subscribe(paises => {
    //         console.log(paises[0]);
    //       });
    //
    //   });
  }

}
