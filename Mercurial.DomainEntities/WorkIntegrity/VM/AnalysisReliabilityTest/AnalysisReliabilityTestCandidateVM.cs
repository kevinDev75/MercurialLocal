using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.VM.AnalysisReliabilityTest
{
    public class AnalysisReliabilityTestCandidateVM
    {
        public long IdTestConfiabilidad { get; set; }
        public long IdIntegridad { get; set; }
        public int ItemIntegridadDet { get; set; }
        public string Analisis { get; set; }
    }
}
