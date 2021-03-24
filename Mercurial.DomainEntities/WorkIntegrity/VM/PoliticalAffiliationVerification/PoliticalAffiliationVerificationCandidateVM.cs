using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.VM.PoliticalAffiliationVerification
{
    public class PoliticalAffiliationVerificationCandidateVM
    {
        public long IdVerifFiliacionPolitica { get; set; }
        public long IdIntegridad { get; set; }
        public int ItemIntegridadDet { get; set; }
        public bool Flg_Registra { get; set; }
        public List<PoliticalAffiliationVerificationCandidateDetailVM> ListPoliticalAffiliationVerificationDetailVm { get; set; }
    }
}
