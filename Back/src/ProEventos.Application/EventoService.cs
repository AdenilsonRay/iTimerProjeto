using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using ProEventos.Application.Contratos;
using ProEventos.Application.Dtos;
using ProEventos.Domain;
using ProEventos.Persistence.Contratos;

namespace ProEventos.Application
{
    public class EventosService : IEventosService
    {
        #region Variavel local

        private readonly IGeralPersist _geralPersiste;
        private readonly IEventoPersist _eventoPersist;
        private readonly IMapper _mapper;

        #endregion
        
        #region Construtor
        public  EventosService(IGeralPersist geralPersiste, 
                               IEventoPersist eventoPersist,
                               IMapper mapper)
        {
            this._eventoPersist = eventoPersist;
            this._geralPersiste = geralPersiste; 
            this._mapper = mapper;
        }
        #endregion

        #region Add-Update-Delete
        //Entra Dto executa ma persistencia Domain e retorna Dto
        public async Task<EventoDto> AddEventos(EventoDto model)
        {
            try
            {
                //Mapeado o Dto que chega para domain
                var evento = _mapper.Map<Evento>(model);

                //Adicionando
                _geralPersiste.Add<Evento>(evento);

                //Salvando tudo corretamente
                if (await _geralPersiste.SaveChangesAsync())
                {
                    //Recebendo o retorno em Domain
                    var retorno =await _eventoPersist.GetEventoByIdAsync(evento.Id, false); 
                    
                    //Mapeado de Domaind para Dto e retornando
                    return _mapper.Map<EventoDto>(retorno);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<EventoDto> UpDateEvento(int eventoId, EventoDto model)
        {
            //return null;
             try
             {
                 var evento = await _eventoPersist.GetEventoByIdAsync(eventoId, false);
                 if (evento == null) return null;

                 model.Id = evento.Id;

                _mapper.Map(model, evento);


                _geralPersiste.Update<Evento>(evento);

                 if (await _geralPersiste.SaveChangesAsync())
                 {
                    var eventoRetorno = await _eventoPersist.GetEventoByIdAsync(evento.Id, false);
                    return _mapper.Map<EventoDto>(eventoRetorno);
                 }
                 return null;            
             }
             catch (Exception ex)
             {
                 throw new Exception(ex.Message);
             }
        }   

        public async Task<bool> DeleteEvents(int eventoId)
        {
            return true;
            // try
            // {
            //     var evento = await _eventoPersist.GetEventoByIdAsync(eventoId, false);
            //     if (evento == null) throw new Exception("Evento para delete nao encontrado.");

            //     _geralPersiste.Delete<EventoDtos>(evento);

            //     return await _geralPersiste.SaveChangesAsync();
            // }
            // catch (Exception ex)
            // {
            //     throw new Exception(ex.Message);
            // }
        }
        #endregion

        #region Consultas
        public async Task<EventoDto[]> GetAllEventosAsync(bool includePalestrantes = false)
        {
            try
            {
                var eventos = await _eventoPersist.GetAllEventosAsync(includePalestrantes);
                if (eventos == null) return null;

                //Passando do uso do Domain para as tabelas do Dtos mapeadas
                var resultado = _mapper.Map<EventoDto[]>(eventos);

                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<EventoDto[]> GetAllEventosByTemaAsync(string tema, bool includePalestrantes = false)
        {
            try
            {
                var eventos = await _eventoPersist.GetAllEventosByTemaAsync(tema, includePalestrantes);
                if (eventos == null) return null;

                //Passando do uso do Domain para as tabelas do Dtos mapeadas
                var resultado = _mapper.Map<EventoDto[]>(eventos);

                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<EventoDto> GetEventoByIdAsync(int eventoId, bool includePalestrantes = false)
        {
            try
            {
                //Recebendo pelas tabelas do Domain
                var eventos = await _eventoPersist.GetEventoByIdAsync(eventoId, includePalestrantes);
                if (eventos == null) return null;

                //Passando do uso do Domain para as tabelas do Dtos mapeadas
                var resultado = _mapper.Map<EventoDto>(eventos);

                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        #endregion
    }
}