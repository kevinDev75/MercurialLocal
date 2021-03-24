using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.VM.AnexosCandidateVM
{
    public class AnexosCandidateVM
    {
        public long IdAnexo { get; set; }
        public long IdIntegridad { get; set; }
        public int ItemIntegridadDet { get; set; }
        public List<AnexosCandidateDetailVM> ListAnexosDetailVm { get; set; }
    }
}
