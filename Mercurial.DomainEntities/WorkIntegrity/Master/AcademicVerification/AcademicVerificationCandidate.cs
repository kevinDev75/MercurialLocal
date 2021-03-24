using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.Master.AcademicVerification
{
    public class AcademicVerificationCandidate
    {
        public long IdVerifAcademica { get; set; }
        public long IdIntegridad { get; set; }
        public int ItemIntegridadDet { get; set; }
        public List<AcademicVerificationCandidateDetail> ListAcademicVerificationDetailFlt { get; set; }
    }
}
