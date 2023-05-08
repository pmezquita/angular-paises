import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {debounceTime, Subject} from "rxjs";

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
  styles: []
})
export class PaisInputComponent implements OnInit, OnDestroy {

  @Output() onEnter: EventEmitter<string> = new EventEmitter<string>();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter<string>();
  @Input() placeholder: string = 'Buscar...';
  @Input() initialValue: string = '';

  debouncer: Subject<string> = new Subject<string>();

  termino: string = '';

  ngOnInit(): void {
    this.termino = this.initialValue;

    this.debouncer
      .pipe(
        debounceTime(300)
      )
      .subscribe(valor => {
        this.onDebounce.emit(valor);
      });
  }

  buscar() {
    this.onEnter.emit(this.termino);
  }


  teclaPresionada() {
    this.debouncer.next(this.termino);
  }

  ngOnDestroy(): void {
    this.debouncer.unsubscribe();
  }
}
