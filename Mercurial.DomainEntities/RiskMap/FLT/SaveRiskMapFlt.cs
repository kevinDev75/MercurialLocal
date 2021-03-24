using Mercurial.DomainEntities.WorkIntegrity.Master;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.RiskMap.FLT
{
    public class SaveRiskMapFlt
    {
        public long IdMapaRiesgo { get; set; }
        public int IdEmpresa { get; set; }
        public int IdUsuarioEnvio { get; set; }
        public Archive ArchivoAdjunto1 { get; set; }
        public string Nombre { get; set; }
        public string Link { get; set; }
        public bool FlgEstado { get; set; }
    }
}
