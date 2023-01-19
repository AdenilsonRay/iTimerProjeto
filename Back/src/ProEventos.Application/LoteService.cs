using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using ProEventos.Application.Contratos;
using ProEventos.Application.Dtos;
using ProEventos.Domain;
using ProEventos.Persistence.Contratos;

namespace ProEventos.Application
{
    public class LoteService : ILoteService
    {
        #region Variavel local

        private readonly IGeralPersist _geralPersiste;
        private readonly ILotePersist _lotePersist;
        private readonly IMapper _mapper;

        #endregion

        #region Construtor

        public LoteService(IGeralPersist geralPersiste,
                            ILotePersist lotePersist,
                            IMapper mapper)
        {
            this._geralPersiste = geralPersiste;
            this._lotePersist = lotePersist;
            this._mapper = mapper;
        }
        #endregion

        #region Add-Update-Delete

        public async Task AddLote(int eventoId,LoteDto model)
        {
            try
            {
                //Mapeado o Dto que chega para domain
                var loteDomain = _mapper.Map<Lote>(model);

                //Defini de que evento pertence esse lote
                loteDomain.EventoId = eventoId;

                //Adicionando
                _geralPersiste.Add<Lote>(loteDomain);

                //Salvando tudo corretamente
                await _geralPersiste.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<LoteDto> UpdateLote(int eventoId, LoteDto model)
        {
            try
            {
                var loteDomain = await _lotePersist.GetLoteByIdsAsync(eventoId, model.Id);
                if (loteDomain == null) return null;

                model.Id = loteDomain.Id;

                _mapper.Map(model, loteDomain);


                _geralPersiste.Update<Lote>(loteDomain);

                if (await _geralPersiste.SaveChangesAsync())
                {
                    var loteDomainRetorno = await _lotePersist.GetLoteByIdsAsync(eventoId, loteDomain.Id);
                    return _mapper.Map<LoteDto>(loteDomainRetorno);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<LoteDto[]> SaveLotes(int eventoId, LoteDto[] models)
        {
            try
            {
                //Recupera lotes ja cadastrados no banco
                var lotesBancoDomain = await _lotePersist.GetLotesByEventoIdAsync(eventoId);

                //Se nao existir lotes retorna nulo
                if (lotesBancoDomain == null) return null;

                //Percorrer os lotes recebidos
                foreach (var model in models)
                {
                    //Se novos lotes incluidos. Adicionar ao banco 
                    if (model.Id == 0)    
                    {                
                        await AddLote(eventoId,model);
                    }
                    else //Se lotes alterados. Alterar no banco
                    {
                        //Recupera da lista do banco o mesmo item sendo analizado
                        var loteCorrenteDomain = lotesBancoDomain.FirstOrDefault(lote => lote.Id == model.Id);

                        //Definindo o id ja cadastrado do lote alterado
                        model.Id = loteCorrenteDomain.Id;

                        //Model passara seua valores para o loteCorrenteDomain(Dto p/ Domain)
                        _mapper.Map(model, loteCorrenteDomain);

                        //Realiza atualizacao do lote corrente
                        _geralPersiste.Update<Lote>(loteCorrenteDomain);

                        //Realizando as alteracoes e inclusoes no banco que foram definidas acima
                        await _geralPersiste.SaveChangesAsync();

                    }
                }
                    //Recuperando lotes cadastrados e alterado agora
                    var lotesRetornoDomain = await _lotePersist.GetLotesByEventoIdAsync(eventoId);

                    //Passando lotesRetornoDomain para estrutura LoteDto
                    return _mapper.Map<LoteDto[]>(lotesRetornoDomain);            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> DeleteLote(int loteId, int eventoId)
        {
            try
            {
                var lote = await _lotePersist.GetLoteByIdsAsync(eventoId, loteId);
                if (lote == null) throw new Exception("Lote para delete nao encontrado.");

                _geralPersiste.Delete<Lote>(lote);

                return await _geralPersiste.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        #endregion

        #region Consultas

        public async Task<LoteDto[]> GetLotesByEventoIdAsync(int eventoId)
        {
            try
            {
                var lotes = await _lotePersist.GetLotesByEventoIdAsync(eventoId);
                if (lotes == null) return null;

                //Passando do uso do Domain para as tabelas do Dtos mapeadas
                var resultado = _mapper.Map<LoteDto[]>(lotes);

                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<LoteDto> GetLoteByIdsAsync(int eventoId, int loteId)
        {
            try
            {
                //Recebendo pelas tabelas do Domain
                var lote = await _lotePersist.GetLoteByIdsAsync(eventoId, loteId);
                if (lote == null) return null;

                //Passando do uso do Domain para as tabelas do Dtos mapeadas
                var resultado = _mapper.Map<LoteDto>(lote);

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