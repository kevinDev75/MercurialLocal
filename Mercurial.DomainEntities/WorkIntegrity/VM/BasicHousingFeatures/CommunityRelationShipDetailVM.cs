using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.VM.BasicHousingFeatures
{
    public class CommunityRelationShipDetailVM
    {
        public int IdRelacionComunidad { get; set; }
        public int IdCaracteristicaBas { get; set; }
        public string Nombre { get; set; }
        public string TiempoConoce { get; set; }
        public string Concepto { get; set; }
    }
}
