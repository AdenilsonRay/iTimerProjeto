import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, AbstractControlOptions } from '@angular/forms';
import { ValidationField } from '@app/helpers/ValidationField';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  //Variaveis local
  form!: FormGroup;

  constructor(public fb:FormBuilder) { }

  ngOnInit(): void {
    this.validacaoForm();
  }

  //Funcao de validacao de formulario
  private validacaoForm(): void {

    //Cria variavel do tipo Option Abstract Control a definindo como o metodo da class criada para validacao
    const formOptions:AbstractControlOptions = {
      validators: ValidationField.MustMatch('senha','confirmar')
    };

    this.form = this.fb.group({
      nome:      ['',[Validators.required, Validators.minLength(4),Validators.maxLength(50)]],
      sobrenome: ['',[Validators.required, Validators.minLength(4),Validators.maxLength(50)]],
      email:     ['',[Validators.required, Validators.email]],
      usuario:   ['',[Validators.required, Validators.minLength(3),Validators.maxLength(20)]],
      senha:     ['',[Validators.required, Validators.minLength(3),Validators.maxLength(8)]],
      confirmar: ['',[Validators.required, Validators.minLength(3),Validators.maxLength(8)]],
      concorda:  ['', Validators.required],
    }, formOptions);
  }

  //Chamar campos do form
  public get f(): any {
    return this.form.controls;
  }

  //Limpa dados dos campos
  public reset(): void{
    this.form.reset();
  }
}
