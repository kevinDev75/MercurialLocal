using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.Master.TerrorismBackground
{
    public class TerrorismBackgroundCandidateDetail
    {
        public int IdAntecTerro { get; set; }
        public int ItemAntecTerro { get; set; }
        public string Delito { get; set; }
        public DateTime? FechaSentencia { get; set; }
        public DateTime? FechaEjecutoria { get; set; }
        public string JuzgadoEjecucionSentencia { get; set; }
        public string NroExpediente { get; set; }
        public double MontoPagosPendientes { get; set; }
           
    }
}
