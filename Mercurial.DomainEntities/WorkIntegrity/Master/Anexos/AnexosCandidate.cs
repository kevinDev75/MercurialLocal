using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.Master.Anexos
{
    public class AnexosCandidate
    {
        public long IdAnexo { get; set; }
        public long IdIntegridad { get; set; }
        public int ItemIntegridadDet { get; set; }
        public List<AnexosCandidateDetail> ListAnexosDetFlt { get; set; }
    }
}
