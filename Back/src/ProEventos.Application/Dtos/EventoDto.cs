using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace ProEventos.Application.Dtos
{
    public class EventoDto
    {
        public int Id { get; set; }
        public string Local { get; set; }
        public string DataEvento { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatório!"),
        //  MinLength(3,ErrorMessage = "{0} deve ter no mínimo 4 caracteres."),
        //  MaxLength(50,ErrorMessage = "{0} deve ter no máximo 50 caracteres.")
         StringLength(50,MinimumLength =3,ErrorMessage ="Intervalo de 3 a 50 caracteres!")
         ]
        public string Tema { get; set; }

        [Required(ErrorMessage ="O campo {0} é obrigatário!")]
        [Display(Name ="Qta de Péssoas")]
        [Range(1,120000,ErrorMessage ="O campo {0} dever ser entre 1 a 1200000!")]
        public int QtdPessoa { get; set; }

        [RegularExpression(@".*\.(jpe?g|png|gif|bmp)$",
        ErrorMessage ="Ñão é uma imagem válida. (gif,jpg,jpeg,bmp ou png.)!")]
        public string ImagemURL { get; set; }

        [Required(ErrorMessage ="O campo {0} é obrigatório!")]
        [Phone(ErrorMessage ="O campo {0} não é um número válido!")]
        public string Telefone { get; set; }
        
        [Required(ErrorMessage ="O campo {0} é obrigatório!")]
        [Display(Name ="E-mail")]
        [EmailAddress(ErrorMessage ="O campo {0} precisa ser válido!")]
        public string Email { get; set; }

        public IEnumerable<LoteDto> Lotes { get; set; }
        public IEnumerable<RedeSocialDto> RedesSociais { get; set; }
        public IEnumerable<PalestranteDto> PalestrantesEventos { get; set; }
    }
} 