using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.VM.PremiumPersonalHistory
{
    public class PremiumPersonalHistoryCandidateVM
    {
        public long IdAntecPersonalPremium { get; set; }
        public long IdIntegridad { get; set; }
        public int ItemIntegridadDet { get; set; }
        public string Observaciones { get; set; }
        public string Analisis { get; set; }
        public bool Registra { get; set; }
    }
}
