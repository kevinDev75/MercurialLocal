using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.Master.FinancialRecordsAnalysis
{
    public class FinancialRecordsAnalysisCandidate_Col
    {
        public long IdAnalisisAntecFinanciero { get; set; }
        public long IdIntegridad { get; set; }
        public int ItemIntegridadDet { get; set; }
        public string NivelRiesgoFinanciero { get; set; }
        public string Observaciones { get; set; }
        public string Analisis { get; set; }
    }
}
