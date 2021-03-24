using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.Master.WorkBackgroundCheck
{
    public class WorkBackgroundCheckCandidate
    {
        public long IdVerifAntecLaboral { get; set; }
        public long IdIntegridad { get; set; }
        public int ItemIntegridadDet { get; set; }
        public bool Flg_Registra { get; set; }
        public List<WorkBackgroundCheckCandidateDetail> ListWorkBackgroundCheckDetailFlt { get; set; }
    }
}
