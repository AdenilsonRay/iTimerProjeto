import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, MinValidator, Validators } from '@angular/forms';
import { ValidationField } from '@app/helpers/ValidationField';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})

export class PerfilComponent implements OnInit {

  //Variaveis Local
  form:FormGroup;

  constructor(private fb:FormBuilder) { }

  ngOnInit() {
    this.ValidadorForm();
  }

  //Criando as validacoes dos campos
  public ValidadorForm(): void {

    const formOptions: AbstractControlOptions={
      validators: ValidationField.MustMatch('senha','confirmarsenha'),
    }

    this.form = this.fb.group({
      titulo:         ['', Validators.required],
      primeironome:   ['',[Validators.required,Validators.minLength(4),Validators.maxLength(20)]],
      ultimoname:     ['',[Validators.required,Validators.minLength(4),Validators.maxLength(20)]],
      email:          ['',[Validators.required,Validators.email,Validators.minLength(4)]],
      telefone:       ['', Validators.required],
      funcao:         ['',[Validators.required,Validators.minLength(4),Validators.maxLength(20)]],
      descricao:      ['',[Validators.required,Validators.minLength(4),Validators.maxLength(20)]],
      senha:          ['',[Validators.required,Validators.minLength(4),Validators.maxLength(20)]],
      confirmarsenha: ['',[Validators.required,Validators.minLength(4),Validators.maxLength(20)]],
    },formOptions);
  }

  public get f(): any {
    return this.form.controls;
  }

  public resetForm(event: any): void {3
    event.preventDefault(); //Nao atualize a tela
    this.form.reset();
  }

}
