using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.VM.ProfessionalEnvironment
{
    public class ProfessionalEnvironmentCandidateVM
    {
        public int IdEntornoProf { get; set; }
        public int IdIntegridad { get; set; }
        public int ItemIntegridadDet { get; set; }
        public List<ProfessionalEnvironmentCandidateDetailVM> ListProfessionalEnvironmentDetailVm { get; set; }
    }
}
