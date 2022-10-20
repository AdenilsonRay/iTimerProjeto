using System;
using System.Linq;
using System.Threading.Tasks;
using ProEventos.Domain;
using Microsoft.AspNetCore.Mvc;
using ProEventos.Application.Contratos;

namespace iTime.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventosController : ControllerBase
    {
        private readonly IEventosService eventoService;
        public EventosController(IEventosService ieventoService)
        {
            this.eventoService = ieventoService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        { 
            try
            {
                var eventos = await eventoService.GetAllEventosAsync(false);
                if (eventos == null) return NotFound("Nenhum evento encontrado.");

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
                var evento = await eventoService.GetEventoByIdAsync(EventoId:id);
                if (evento == null) return NotFound("Nenhum evento encontrado.");
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
                if (eventos == null) return NotFound("Nenhum evento por tema encontrado.");
                return Ok(eventos);  
            }
            catch (Exception ex)
            {
                return this.StatusCode(500,
                $"Erro ao tentar recuperar evento por tema. Erro:{ex.Message}");
            }
        }



        [HttpPost]
        public async Task<IActionResult> Post(Evento model)
        { 
            try
            {
                var evento = await eventoService.AddEventos(model);
                if (evento == null) return BadRequest("Erro ao tentar adicionar evento.");
                return Ok(evento);  
            }
            catch (Exception ex)
            {
                return this.StatusCode(500,
                $"Erro ao tentar registrar evento. Erro:{ex.Message}");
            }
        }

       [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, Evento model)
        { 
            try
            {
                var evento = await eventoService.UpDateEvento(id,model);
                if (evento == null) return BadRequest("Erro ao tentar alterar evento.");
                return Ok(evento);  
            }
            catch (Exception ex)
            {
                return this.StatusCode(500,
                $"Erro ao tentar alterar evento. Erro:{ex.Message}");
            }
        }

      [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        { 
            try
            {
                if (!await eventoService.DeleteEvents(id)) return BadRequest("Erro ao tentar deletar evento.");
                return Ok("Evento deletado");  
            }
            catch (Exception ex)
            {
                return this.StatusCode(500,
                $"Erro ao tentar deletar evento. Erro:{ex.Message}");
            }
        }   
        
             
    }
}
