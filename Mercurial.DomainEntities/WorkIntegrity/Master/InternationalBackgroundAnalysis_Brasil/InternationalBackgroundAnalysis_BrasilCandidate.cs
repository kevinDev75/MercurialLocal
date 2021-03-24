using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.Master.InternationalBackgroundAnalysis_Brasil
{
    public class InternationalBackgroundAnalysis_BrasilCandidate
    {
        public long IdAnalisisAntecPersonInter { get; set; }
        public long IdIntegridad { get; set; }
        public int ItemIntegridadDet { get; set; }
        public string OFAC { get; set; }
        public string INTERPOL { get; set; }
        public string ONU { get; set; }
        public string InformacionAdicional { get; set; }
    }
}
