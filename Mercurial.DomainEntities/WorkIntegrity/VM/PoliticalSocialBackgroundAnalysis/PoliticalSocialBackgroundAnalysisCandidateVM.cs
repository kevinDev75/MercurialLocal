using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.VM.PoliticalSocialBackgroundAnalysis
{
    public class PoliticalSocialBackgroundAnalysisCandidateVM
    {
        public long IdAnalisisAntecSocialPolitico { get; set; }
        public long IdIntegridad { get; set; }
        public int ItemIntegridadDet { get; set; }
        public string VerificacionCargoPublico { get; set; }
        public string VerificacionFiliacionPolitica { get; set; }
        public string MultasElectorales { get; set; }
    }
}
