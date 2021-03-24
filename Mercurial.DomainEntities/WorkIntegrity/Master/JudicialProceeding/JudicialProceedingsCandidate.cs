using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.Master.JudicialProceeding
{
    public class JudicialProceedingsCandidate
    { 
        public int IdProcesoJudicial { get; set; }
        public int IdIntegridad { get; set; }
        public int ItemIntegridadDet { get; set; }
        public int NumProcesosContra { get; set; }
        public int NumProcesosInterpuestos { get; set; }
        public List<JudicialProceedingsCandidateDetail> ListJudicialProceedingsDetailFlt { get; set; }
    }
}
