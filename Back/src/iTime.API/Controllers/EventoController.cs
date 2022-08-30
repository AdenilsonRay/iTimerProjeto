using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using iTime.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;


namespace iTime.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventoController : ControllerBase
    {
        public IEnumerable<Evento> _evento = new Evento[] {
            new Evento(){
            EventoId=1,
            Tema="Angular 11 e .NET 5",
            Local="1 Lote",
            QtdPessoa = 23,
            Lote="222",
            DataEvento=DateTime.Now.AddDays(2).ToString(),
            ImagemURL="FOTO.PNG"
            },
            new Evento(){
            EventoId=2,
            Tema="Angular 11 e .NET 6",
            Local="7 Lote",
            QtdPessoa = 55,
            Lote="22",
            DataEvento=DateTime.Now.AddDays(4).ToString(),
            ImagemURL="FOTO2.PNG"
            }                
        }; 

        public EventoController()
        {

        }

        [HttpGet]
        public IEnumerable<Evento> Get()
        { 
            return _evento;
        }

        [HttpGet("{id}")]
        public IEnumerable<Evento> GetById(int id)
        { 
            return _evento.Where(Evento=>Evento.EventoId==id);
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
