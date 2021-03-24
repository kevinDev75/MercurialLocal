using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.Master.PoliticalAffiliationVerification
{
    public class PoliticalAffiliationVerificationCandidateDetail
    {
        public long IdVerifFiliacionPolitica { get; set; }
        public int ItemVerifFiliacionPolitica { get; set; }
        public string HistorialAFiliacion { get; set; }
        public string HistorialCandidatura { get; set; }
    }
}
