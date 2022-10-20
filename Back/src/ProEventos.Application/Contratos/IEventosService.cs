using System.Threading.Tasks;
using ProEventos.Domain;

namespace ProEventos.Application.Contratos
{
    public interface IEventosService
    {
        Task<Evento> AddEventos(Evento model);
        
        Task<Evento> UpDateEvento(int eventoId, Evento model);

        Task<bool> DeleteEvents(int eventoId);


        Task<Evento[]> GetAllEventosAsync(bool includePalestrantes = false);

        Task<Evento[]> GetAllEventosByTemaAsync(string tema, bool includePalestrantes = false);
        
        Task<Evento> GetEventoByIdAsync(int EventoId, bool includePalestrantes = false);
    }
}