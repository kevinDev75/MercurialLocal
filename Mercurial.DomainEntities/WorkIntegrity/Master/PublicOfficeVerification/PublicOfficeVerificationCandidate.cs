using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.Master.PublicOfficeVerification
{
    public class PublicOfficeVerificationCandidate
    {
        public long IdVerifCargoPublico { get; set; }
        public long IdIntegridad { get; set; }
        public int ItemIntegridadDet { get; set; }
        public bool Flg_Registra { get; set; }
        public List<PublicOfficeVerificationCandidateDetail> ListPublicOfficeVerificationDetailFlt { get; set; }
    }
}
