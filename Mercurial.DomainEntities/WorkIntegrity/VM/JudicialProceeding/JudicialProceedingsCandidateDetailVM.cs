using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.VM.JudicialProceeding
{
    public class JudicialProceedingsCandidateDetailVM
    {
        public int IdProcesoJudicial { get; set; }
        public int ItemProcesoJudicial { get; set; }
        public string Ciudad { get; set; }
        public string Despacho { get; set; }
        public string Proceso { get; set; }
        public string Clase { get; set; }
        public string Demandantes { get; set; }
        public string Demandados { get; set; }
    }
}
