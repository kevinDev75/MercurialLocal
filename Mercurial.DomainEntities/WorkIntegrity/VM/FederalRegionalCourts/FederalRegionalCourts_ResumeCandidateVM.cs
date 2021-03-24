using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.VM.FederalRegionalCourts
{
    public class FederalRegionalCourts_ResumeCandidateVM
    {
        public long IdTribunalFederalRegional { get; set; }
        public long IdIntegridad { get; set; }
        public int ItemIntegridadDet { get; set; }
        public string DesTribunalFederalRegional { get; set; }
    }
}
