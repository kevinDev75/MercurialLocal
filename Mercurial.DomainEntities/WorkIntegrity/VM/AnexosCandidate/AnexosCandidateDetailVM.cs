using Mercurial.DomainEntities.WorkIntegrity.Master;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.VM.AnexosCandidateVM
{
    public class AnexosCandidateDetailVM
    {
        public long IdAnexo { get; set; }
        public int ItemAnexo { get; set; }
        public Archive ArchivoAdjuntoAnexo { get; set; }
    }
}
