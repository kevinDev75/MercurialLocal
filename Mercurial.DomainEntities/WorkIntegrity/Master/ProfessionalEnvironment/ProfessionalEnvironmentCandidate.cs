using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.Master.ProfessionalEnvironment
{
    public class ProfessionalEnvironmentCandidate
    {
        public int IdEntornoProf { get; set; }
        public int IdIntegridad { get; set; }
        public int ItemIntegridadDet { get; set; }
        public List<ProfessionalEnvironmentCandidateDetail> ListProfessionalEnvironmentDetailFlt { get; set; }
    }
}
