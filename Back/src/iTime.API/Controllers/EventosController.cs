using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ProEventos.Application.Contratos;
using System.Collections.Generic;
using ProEventos.Application.Dtos;

namespace iTime.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventosController : ControllerBase
    {
        private readonly IEventoService eventoService;
        public EventosController(IEventoService ieventoService)
        {
            this.eventoService = ieventoService;
        }



        [HttpGet]
        public async Task<IActionResult> Get()
        { 
            try
            {
                var eventos = await eventoService.GetAllEventosAsync(false);
                if (eventos == null) return NoContent();

                var eventoRetorno = new List<EventoDto>();

                return Ok(eventos);
            }
            catch (Exception ex)
            {
                return this.StatusCode(500,
                $"Erro ao tentar recuperar eventos. Erro:{ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        { 
            try
            {
                var evento = await eventoService.GetEventoByIdAsync(EventoId:id, true);
                if (evento == null) return NoContent();
                return Ok(evento);  
            }
            catch (Exception ex)
            {
                return this.StatusCode(500,
                $"Erro ao tentar recuperar evento. Erro:{ex.Message}");
            }
        }

        [HttpGet("{tema}/tema")]
        public async Task<IActionResult> GetByTema(string tema)
        { 
            try
            {
                var eventos = await eventoService.GetAllEventosByTemaAsync(tema:tema);
                if (eventos == null) return NoContent();
                return Ok(eventos);  
            }
            catch (Exception ex)
            {
                return this.StatusCode(500,
                $"Erro ao tentar recuperar evento por tema. Erro:{ex.Message}");
            }
        }




        [HttpPost]
        public async Task<IActionResult> post(EventoDto model)
        { 
            try
            {
                var evento = await eventoService.AddEventos(model);
                if (evento == null) return NoContent();
                return Ok(evento);  
            }
            catch (Exception ex)
            {
                return this.StatusCode(500,
                $"Erro ao tentar registrar evento. Erro:{ex.Message}");
            }
        }

       [HttpPut("{id}")]
        public async Task<IActionResult> put(int id, EventoDto model)
        { 
            try
            {
                var evento = await eventoService.UpDateEvento(id,model);
                if (evento == null) return NoContent();
                return Ok(evento);  
            }
            catch (Exception ex)
            {
                return this.StatusCode(500,
                $"Erro ao tentar alterar evento. Erro:{ex.Message}");
            }
        }

      [HttpDelete("{id}")]
        public async Task<IActionResult> delete(int id)
        { 
            try
            {
                //Verifica se o item existe. Se map existe retorna nullo
                var evento = await eventoService.GetEventoByIdAsync(EventoId:id, true);
                if (evento == null) return NoContent();

                //Existindo execulta a acao e retorna um objeto confirmando se nao o ERRO.
                return await eventoService.DeleteEvento(id)
                ? Ok(new {message = "Deletado"}) 
                : throw new ("Ocorreu um problema não especifico ao tentar deletar Evento.");  
            }
            catch (Exception ex)
            {
                return this.StatusCode(500,
                $"Erro ao tentar deletar evento. Erro:{ex.Message}");
            }
        }     
    }
}
