using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.Master.ElectoralFines
{
    public class ElectoralFinesCandidateDetail
    {
        public long IdMultaElectoral { get; set; }
        public int ItemMultaElectoral { get; set; }
        public string Codigo { get; set; }
        public string ProcesoElectoral { get; set; }
        public string TipoOmision { get; set; }
        public decimal Deuda { get; set; }
        public string EtapaCobranza { get; set; }
    }
}
