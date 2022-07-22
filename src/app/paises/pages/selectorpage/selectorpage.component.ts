import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisesService } from '../../services/paises.service';
import { PaisSmall } from '../../interface/pais.interface';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-selectorpage',
  templateUrl: './selectorpage.component.html',
  styles: [
  ]
})
export class SelectorpageComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group(
    {
      region:    ['',Validators.required],
      pais:      ['',Validators.required],
      frontera: ['', Validators.required]
    }
  )
  paises   : PaisSmall   [] = [];
  regiones : string      [] = [];
  fronteras: PaisSmall   [] = [];
  // fronteras: string   [] = [];


  cargando: boolean = false;

  constructor(private fb: FormBuilder,
              private paisesService: PaisesService) { }

  ngOnInit(): void {
    this.regiones = this.paisesService.regiones;
    
    //Cuando cambie la region
    // this.miFormulario.get('region')?.valueChanges
    // .subscribe( region =>{
    //   console.log(region);

    //   this.paisesService.getPaisePorRegion(region)
    //   .subscribe( paises=> {
    //     console.log(paises)
    //     this.paises = paises;
    //   })
    // })



    // Cambio de la region
    this.miFormulario.get('region')?.valueChanges
    .pipe(
      tap( ( _ ) => {
        this.miFormulario.get('pais')?.reset('');
        // this.miFormulario.get('fronteras')?.disable();
        this.cargando = true;
      } ),
      switchMap(region => this.paisesService.getPaisePorRegion(region) )
    ).subscribe( paises => {
      this.paises = paises;
      this.cargando = false;
    });

    //Cuando cambia de pais
    this.miFormulario.get('pais')?.valueChanges
    .pipe(
      tap((_) => {
        this.miFormulario.get('frontera')?.reset('');
        // this.miFormulario.get('fronteras')?.enable();
        this.cargando = true;
      }),
      switchMap( codigo => this.paisesService.getPaisPorCodigo(codigo) ),
      switchMap( pais => this.paisesService.getPaisesPorCodigos(pais?.borders!) )
    ).subscribe(paises =>{
      // this.fronteras = pais?.borders || [];
      this.fronteras = paises;
      this.cargando = false;
    })
    



  }


  guardar(){
    console.log(this.miFormulario.value);
  }
}
