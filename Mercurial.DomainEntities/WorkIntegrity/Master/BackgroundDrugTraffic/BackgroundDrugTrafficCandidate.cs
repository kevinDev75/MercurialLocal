using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.Master.BackgroundDrugTraffic
{
    public class BackgroundDrugTrafficCandidate
    {
        public int IdAntecTrafDroga { get; set; }
        public int IdIntegridad { get; set; }
        public int ItemIntegridadDet { get; set; }
        public bool Flg_Registra { get; set; }
        public List<BackgroundDrugTrafficCandidateDetail> ListBackgroundDrugTraffickingDetailFlt { get; set; }
    }
}
