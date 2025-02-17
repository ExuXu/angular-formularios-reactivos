import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './dinamic-page.component.html',
  styles: ``
})
export class DinamicPageComponent {

  public myForm: FormGroup = this.fb.group({
    name: ['', [ Validators.required, Validators.minLength(3) ] ],
    favoriteGames: this.fb.array([
      ['Borderlands', Validators.required],
      ['The legend of Zelda', Validators.required],
    ])
  });

  public newFavorite: FormControl = new FormControl('',  Validators.required );

  constructor( private fb: FormBuilder ) {

  }

  get favoriteGamesControl() {
    return this.myForm.get( 'favoriteGames' ) as FormArray;
  }

  isNotValidField( field: string ): boolean | null {
    return this.myForm.controls[field].errors &&
      this.myForm.controls[field].touched;
  }

  getFieldError( field: string ): string | null {
    if ( !this.myForm.controls[ field ]) return null;

    const errors = this.myForm.controls[ field ].errors || {};

    for ( const key of Object.keys(errors) ) {
      switch ( key ) {
        case 'required':
          return 'Este campo es requerido'

          case 'minlength':
          return `Este campo rquiere mínimo ${ errors['minlength'].requiredLength } caracteres`
      }

    }
    return '';
  }

  isNotValidFieldInArray( formArray: FormArray, index: number ): boolean | null {
    return formArray.controls[index].errors
        && formArray.controls[index].touched;
  }

  onAddToFavorites(): void {
    if ( this.newFavorite.invalid ) return;

    const newGame = this.newFavorite.value;

    this.favoriteGamesControl.push(
      this.fb.control( newGame, [ Validators.required ])
    )

    this.newFavorite.reset();

  }

  onDeleteFavorite( index: number ): void {
    this.favoriteGamesControl.removeAt( index );
  }

  onSubmit(): void {

    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return
    }

    console.log(this.myForm.value);

    this.myForm.reset();
    (this.myForm.controls['favoriteGames'] as FormArray) = this.fb.array([]);

  }
}
