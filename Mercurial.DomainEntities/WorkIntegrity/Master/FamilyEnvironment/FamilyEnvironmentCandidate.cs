using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.Master.FamilyEnvironment
{
    public class FamilyEnvironmentCandidate
    {
        public int IdEntornoFamiliar { get; set; }
        public int IdIntegridad { get; set; }
        public int ItemIntegridadDet { get; set; }
        public string RptaCasoSerCandidato { get; set; }
        public List<FamilyEnvironmentCandidateDetail> ListFamilyEnvironmentDetailFlt { get; set; }
    }
}
