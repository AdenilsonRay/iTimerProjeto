import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Evento } from '@app/models/Evento';
import { Lote } from '@app/models/Lote';
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
  public evento = {} as Evento;
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
    //private router:Router
  ) {
    this.localeService.use('pt-br');
  }


  public ngOnInit(): void {
    this.carregarEvento();
    this.validation();
    this.obterCep();
  }


  public carregarEvento(): void {
    const eventoIdParam = this.router.snapshot.paramMap.get('id');
    //this.idevento = eventoIdParam;

    if (eventoIdParam != null) {
      this.spinner.show();

      this.estadoSalvar = 'put';

      var x = this.eventoService.getEventoById(+eventoIdParam).subscribe(
        (evento: Evento) => {
          this.evento = { ... evento};
          this.form.patchValue(this.evento);
        },

        (error: any) => {
          this.spinner.hide();
          this.toastr.error(
            `Error ao tentar carregar Evento! ${this.evento.email}`,
            'Error!'
          );
          console.error(error);
        },

        () => {
          this.spinner.hide();
        }
      );
    }
    this.evento;
  }

  // public get consutaTema() {
  //   let t = this.form.get('tema')?.value;
  // }

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
      lotes: this.fb.array([])
    });
  }

  get modoEditar(): boolean{
   return this.estadoSalvar === 'put';
  }

  //Obtendo e retornando a lista atualizada dos lotes da tela como um array de form
  get lotes(): FormArray {
    return this.form.get('lotes') as FormArray;
  }

  //Recupera a lista de lotes atualizada na funcao acima e adiciona a criacao de mais um lote vazio
  //que sera validado e preenchido
  public adicionarLote(): void{

    //Crio um grupo com apenas o primeito item do grupo que desejo passar
    // e os demais itens vao com seu valor padrao da class desse item
    this.lotes.push(this.criarLote({id:0} as Lote));
  }

  //Esta funcao retorna um tipo especifico
  //vai receber uma estrutura Lote vazio"
  public criarLote(lote:Lote): FormGroup {

    //Insere no formuario da tela um lote vazio quer sera validados seus itens
    //e retornado com os valores validados que seram adicionados no "push" da funcao acima
    return this.fb.group({
      id:[lote.id],
      nome:[lote.nome, Validators.required],
      quantidade:[lote.quantidade, Validators.required],
      preco:[lote.preco, Validators.required],
      dataInicio:[lote.dataInicio],
      dataFim:[lote.dataFim]
    });
  }

  //Chamando o grupo de campos
  get f(): any {
    return this.form.controls;
  }

  //Confirgurando o dataPicht
  get bsConfig(): any {
    return {
      isAnimated: true,
      adaptivePosition: true,
      dateInputFormat: 'DD/MM/YYYY hh:mm a',
      containerClass: 'theme-default',
      showWeekNumbers: false
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

    //Se formulario valido
    if (this.form.valid) {

      //Repassar os valores de um objeto para outro usando o 'Expred Operadition'
      //Quando post(incluir) so valores quando put(alterar) valores e id
      this.evento = this.estadoSalvar == 'post'
                    ? { ...this.form.value }
                    : { id: this.evento.id, ...this.form.value };

      //Passa o evento novo e Executa o cadastro atraves do servico tratando os possiveis retornos
      //Esta chamando a funcao pelo nome "['post']" em vez de chamar pelo tradicional '.post' no lugar do PONTO '.' coloca o [NOME]
      this.eventoService[this.estadoSalvar](this.evento).subscribe(
        //NEXT - Se todo Ok informa ao usuario
        (eventoRetorno: Evento) =>
          this.toastr.success('Evento salvo com sucesso!', 'Sucesso!'),
          //this.router.navigate([`eventos/detalhe/${eventoRetorno.id}`]);


        //ERROR - Se algm erro informa no console da pagina e informa o usuario
        (error: any) => {
          console.error(error);
          this.spinner.hide();
          this.toastr.error('Houve um erro ao cadastrar o evento.', 'Error');
        },

        //COMPLETE - Por fim cancelar spinner
        () => this.spinner.hide()
      )
    }
  }
}
