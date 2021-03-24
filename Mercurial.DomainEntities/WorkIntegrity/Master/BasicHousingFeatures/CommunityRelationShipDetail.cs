using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.Master.BasicHousingFeatures
{
    public class CommunityRelationShipDetail
    {
         public int IdRelacionComunidad { get; set; }
         public int IdCaracteristicaBas { get; set; }
         public string Nombre { get; set; }
         public string TiempoConoce { get; set; }
         public string Concepto { get; set; }
    }
}
