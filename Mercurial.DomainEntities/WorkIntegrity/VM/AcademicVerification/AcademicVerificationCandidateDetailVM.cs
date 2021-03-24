using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.VM.AcademicVerification
{
    public class AcademicVerificationCandidateDetailVM
    {
        public long IdVerifAcademica { get; set; }
        public int ItemVerifAcademica { get; set; }
        public string Graduado { get; set; }
        public string Grado { get; set; }
        public string Institucion { get; set; }
    }
}
