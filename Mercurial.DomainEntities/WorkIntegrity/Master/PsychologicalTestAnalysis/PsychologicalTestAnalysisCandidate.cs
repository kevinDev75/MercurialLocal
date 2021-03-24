using Mercurial.DomainEntities.WorkIntegrity.Master;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.Master.PsychologicalTestAnalysis
{
    public class PsychologicalTestAnalysisCandidate
    {
        public long IdAnalisisTestPsicologico { get; set; }
        public long IdIntegridad { get; set; }
        public int ItemIntegridadDet { get; set; }
        public string DesAnalisisTestPsicologico { get; set; }
        public Archive ArchivoAdjunto { get; set; }

    }
}
