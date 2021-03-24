using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.VM.BackgroundDrugTraffic
{
    public class BackgroundDrugTrafficCandidateVM
    {
        public int IdAntecTrafDroga { get; set; }
        public int IdIntegridad { get; set; }
        public int ItemIntegridadDet { get; set; }
        public bool Flg_Registra { get; set; }
        public List<BackgroundDrugTrafficCandidateDetailVM> ListBackgroundDrugTraffickingDetailVm { get; set; }
    }
}
