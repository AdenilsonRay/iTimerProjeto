import { AbstractControl, FormGroup } from '@angular/forms';

export class ValidationField {
  static MustMatch(controlName:string, matchingControlName:string): any{

    //Cria um metodo anonimo que define variaveis e retorna algo
    return (group:AbstractControl) => {

      //Define variavel da abstracao group para o tipo FormGroup
      const formGroup = group as FormGroup;

      //Cria variavel tipo formGroup com valos do "controlName e matchingControlName" passados
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      //Se tem erros e nao e o erro 'mustMach'
      if (matchingControl.errors && !matchingControl.errors.mustMach) {
        return null;
      }

      //Se os controles tem valores diferentes
      if (control.value != matchingControl.value) {
        matchingControl.setErrors({mustMatch:true});
      }else{
        matchingControl.setErrors(null);
      }

      return null;
    }
  }
}
