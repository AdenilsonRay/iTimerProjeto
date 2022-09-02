using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using iTime.API.Data;
using iTime.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;


namespace iTime.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventoController : ControllerBase
    {
        private readonly DataContext _context;
        public EventoController(DataContext context)
        {
            _context = context;

        }

        [HttpGet]
        public IEnumerable<Evento> Get()
        { 
            return _context.Eventos;
        }

        [HttpGet("{id}")]
        public Evento GetById(int id)
        { 
            return _context.Eventos.FirstOrDefault(Evento=>Evento.EventoId==id);
        }
        [HttpPost]
        public string Post()
        { 
            return "Este e o post";
        }

       [HttpPut("{id}")]
        public string Put(int id)
        { 
            return $"Este e o put com id = {id}";
        }

      [HttpDelete("{id}")]
        public string Delete(int id)
        { 
            return $"Este e o delete com id = {id}";
        }        
    }
}
