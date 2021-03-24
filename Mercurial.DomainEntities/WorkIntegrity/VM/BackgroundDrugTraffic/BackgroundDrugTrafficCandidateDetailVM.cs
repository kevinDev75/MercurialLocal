using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.VM.BackgroundDrugTraffic
{
   public class BackgroundDrugTrafficCandidateDetailVM
    {
        public int IdAntecTrafDroga { get; set; }
        public int ItemAntecTrafDroga { get; set; }
        public string Delito { get; set; }
        public string FechaSentencia { get; set; }
        public string FechaEjecutoria { get; set; }
        public string JuzgadoEjecucionSentencia { get; set; }
        public string NroExpediente { get; set; }
        public double MontoPagosPendientes { get; set; }
    }
}
