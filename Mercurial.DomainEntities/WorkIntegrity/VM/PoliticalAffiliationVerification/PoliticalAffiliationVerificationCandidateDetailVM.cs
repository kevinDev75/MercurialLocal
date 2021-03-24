using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.VM.PoliticalAffiliationVerification
{
    public class PoliticalAffiliationVerificationCandidateDetailVM
    {
        public long IdVerifFiliacionPolitica { get; set; }
        public int ItemVerifFiliacionPolitica { get; set; }
        public string HistorialAFiliacion { get; set; }
        public string HistorialCandidatura { get; set; }
    }
}
