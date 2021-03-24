using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.Master.InternationalRestrictiveLists_Brasil
{
    public class InternationalRestrictiveLists_BrasilCandidate
    {
        public long IdListaRestrictivaInternacionalBra { get; set; }
        public long IdIntegridad { get; set; }
        public int ItemIntegridadDet { get; set; }
        public string OFAC { get; set; }
        public string INTERPOL { get; set; }
        public string ONU { get; set; }
    }
}
