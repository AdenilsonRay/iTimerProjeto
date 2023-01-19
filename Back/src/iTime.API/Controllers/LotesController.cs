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
    public class LoteController : ControllerBase
    {
        private readonly ILoteService loteService;

        public LoteController(ILoteService iLoteService)
        {
            this.loteService = iLoteService;
        }



        [HttpGet("{eventoId}")]
        public async Task<IActionResult> Get(int eventoId)
        { 
            try
            {
                var lotes = await loteService.GetLotesByEventoIdAsync(eventoId);
                if (lotes == null) return NoContent();

                var eventoRetorno = new List<EventoDto>();

                return Ok(lotes);
            }
            catch (Exception ex)
            {
                return this.StatusCode(500,
                $"Erro ao tentar recuperar lotes. Erro:{ex.Message}");
            }
        }

       [HttpPut("{eventoId}")]
        public async Task<IActionResult> SaveLotes(int eventoId, LoteDto[] models)
        { 
            try
            {
                var lotes = await loteService.SaveLotes(eventoId,models);
                if (lotes == null) return NoContent();
                return Ok(lotes);  
            }
            catch (Exception ex)
            {
                return this.StatusCode(500,
                $"Erro ao tentar salvar lotes. Erro:{ex.Message}");
            }
        }

      [HttpDelete("{eventoId}/{loteId}")]
        public async Task<IActionResult> Delete(int eventoId, int loteId)
        { 
            try
            {
                var lote = await loteService.GetLoteByIdsAsync(eventoId, loteId);
                if (lote == null) return NoContent();

                return await loteService.DeleteLote(lote.EventoId, lote.Id)
                ? Ok(new {message = "Lote Deletado"}) 
                : throw new ("Ocorreu um problema não especifico ao tentar deletar o lote.");  
            }
            catch (Exception ex)
            {
                return this.StatusCode(500,
                $"Erro ao tentar deletar o lote. Erro:{ex.Message}");
            }
        }     
    }
}
