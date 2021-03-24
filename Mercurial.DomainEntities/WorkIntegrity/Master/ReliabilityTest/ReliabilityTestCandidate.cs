using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.Master.ReliabilityTest
{
    public class ReliabilityTestCandidate
    {
        public long IdTestConfiabilidad { get; set; }
        public long IdIntegridad { get; set; }
        public int ItemIntegridadDet { get; set; }
        public Archive ArchivoAdjunto { get; set; }
    }
}
