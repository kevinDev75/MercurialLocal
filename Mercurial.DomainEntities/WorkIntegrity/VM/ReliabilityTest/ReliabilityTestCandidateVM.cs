using Mercurial.DomainEntities.WorkIntegrity.Master;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.VM.ReliabilityTest
{
    public class ReliabilityTestCandidateVM
    {
        public long IdTestConfiabilidad { get; set; }
        public long IdIntegridad { get; set; }
        public int ItemIntegridadDet { get; set; }
        public Archive ArchivoAdjunto { get; set; }
    }
}
