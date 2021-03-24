using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.VM.FinancialRecordsAnalysis
{
    public class FinancialRecordsAnalysisCandidateVM
    {
        public long IdAnalisisAntecFinanciero { get; set; }
        public long IdIntegridad { get; set; }
        public int ItemIntegridadDet { get; set; }
        public string CompFinancieroSentienel { get; set; }
        public string Sunat { get; set; }
        public string VerifPersExcluidas { get; set; }
        public string NivelRiesgo { get; set; }
    }
}
