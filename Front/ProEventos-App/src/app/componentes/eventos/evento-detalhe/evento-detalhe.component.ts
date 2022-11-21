import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.scss']
})
export class EventoDetalheComponent implements OnInit {

  //Variaveis Local
  form: FormGroup;

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.validation();
  }

  //Criando as validacoes dos campos
  public validation(): void {
    this.form = this.fb.group({
      tema:       ['',[Validators.required,Validators.minLength(4),Validators.maxLength(50)]],
      local:      ['',[Validators.required,Validators.minLength(4),Validators.maxLength(200)]],
      dataEvento: ['', Validators.required],
      qtdPessoa:  ['',[Validators.required,Validators.max(120000)]],
      telefone:   ['', Validators.required],
      email:      ['',[Validators.required,Validators.email]],
      imagemURL:  ['', Validators.required],
    });
  }

  //Chamando o grupo de campos
  public get f(): any {
    return this.form.controls;
  }

  //Limpar Formulario
  public resetForm(): void {
    this.form.reset();
  }
}
