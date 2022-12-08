import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Evento } from '@app/models/Evento';
import { EventoService } from '@app/services/evento.service';

import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.scss'],
})
export class EventoDetalheComponent implements OnInit {
  //Variaveis Local
  public evento1 = {} as Evento;
  public form: FormGroup;
  public idevento: any;
  public ceprecebido: string;

  public estadoSalvar: string = 'post';

  constructor(
    private fb: FormBuilder,
    private localeService: BsLocaleService,
    private router: ActivatedRoute,
    private eventoService: EventoService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {
    this.localeService.use('pt-br');
  }

  public carregarEvento(): void {
    const eventoIdParam = this.router.snapshot.paramMap.get('id');
    this.idevento = eventoIdParam;

    if (eventoIdParam != null) {
      this.spinner.show();

      this.estadoSalvar = 'put';

      this.eventoService.getEventoById(+eventoIdParam).subscribe(
        (evento: Evento) => {
          this.evento1 = { ...evento };
          this.form.patchValue(this.evento1);
        },

        (error: any) => {
          this.spinner.hide();
          this.toastr.error(
            `Error ao tentar carregar Evento! ${this.evento1.email}`,
            'Error!'
          );
          console.error(error);
        },

        () => {
          this.spinner.hide();
        }
      );
    }
  }

  // public get consutaTema() {
  //   let t = this.form.get('tema')?.value;
  // }

  public ngOnInit(): void {
    this.carregarEvento();
    this.validation();
    this.obterCep();
  }

  //Criando as validacoes dos campos
  public validation(): void {
    this.form = this.fb.group({
      tema: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(50),
        ],
      ],
      local: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(200),
        ],
      ],
      dataEvento: ['', Validators.required],
      qtdPessoa: ['', [Validators.required, Validators.max(120000)]],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      imagemURL: ['', Validators.required],
    });
  }

  //Chamando o grupo de campos
  public get f(): any {
    return this.form.controls;
  }

  //Confirgurando o dataPicht
  public get bsConfig(): any {
    return {
      isAnimated: true,
      adaptivePosition: true,
      dateInputFormat: 'DD/MM/YYYY hh:mm a',
      containerClass: 'theme-default',
      showWeekNumbers: false,
    };
  }

  //Limpar Formulario
  public resetForm(): void {
    this.form.reset();
  }

  //Validado a liberacao erros do input
  public cssValidator(campoForm: FormControl): any {
    return { 'is-invalid': campoForm.errors && campoForm.touched };
  }

  public obterCep(): any {
    this.ceprecebido = this.eventoService.getCep('05630-000');
  }

  public salvarAlteracao(): void {
    //Exibir o spninner
    this.spinner.show();

    if (this.form.valid) {
      //Repassar os valores de um objeto para outro usando o 'Expred Operadition'

      this.evento1 =
        this.estadoSalvar == 'post'
          ? { ...this.form.value }
          : { id: this.evento1.id, ...this.form.value };

      //Executa o cadastro atraves do servico tratando os possiveis retornos
      this.eventoService[this.estadoSalvar](this.evento1).subscribe(
        //Se todo Ok informa ao usuario
        () => this.toastr.success('Evento salvo com sucesso!', 'Sucesso!'),

        //Se algm erro informa no console da pagina e informa o usuario
        (error: any) => {
          console.error(error);
          this.spinner.hide();
          this.toastr.error('Houve um erro ao cadastrar o evento.', 'Error');
        },

        //Por fim cancelar spinner
        () => this.spinner.hide()
      )
    }
  }
}
