using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.Master.AnalysisTestDarkFactor
{
    public class AnalysisTestDarkFactorCandidate
    {
        public long IdAnalisisTestFactorOscuro { get; set; }
        public long IdIntegridad { get; set; }
        public int ItemIntegridadDet { get; set; }
        public string Analisis { get; set; }
    }
}
