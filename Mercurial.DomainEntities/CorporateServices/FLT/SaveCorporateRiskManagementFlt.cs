using Mercurial.DomainEntities.WorkIntegrity.Master;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.CorporateServices.FLT
{
    public class SaveCorporateRiskManagementFlt
    {
        public long IdGestionCorporativaRiesgo { get; set; }
        public int IdEmpresa { get; set; }
        public int IdUsuarioEnvio { get; set; }
        public string Nombre { get; set; }
        public string Link { get; set; }
        public Archive ArchivoAdjunto { get; set; }
    }
}
