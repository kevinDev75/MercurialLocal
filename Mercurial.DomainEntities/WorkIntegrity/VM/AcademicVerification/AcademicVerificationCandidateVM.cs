using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.VM.AcademicVerification
{
    public class AcademicVerificationCandidateVM
    {
        public long IdVerifAcademica { get; set; }
        public long IdIntegridad { get; set; }
        public int ItemIntegridadDet { get; set; }
        public List<AcademicVerificationCandidateDetailVM> ListAcademicVerificationDetailVm { get; set; }
    }
}
