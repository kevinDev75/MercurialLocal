using Mercurial.DomainEntities.WorkIntegrity.Master;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.SafetySecurity.FLT
{
    public class SaveCorporateInvestigationsFlt
    {
        public long IdInvestigacionCorporativa { get; set; }
        public int IdEmpresa { get; set; }
        public int IdUsuarioEnvio { get; set; }
        public Archive ArchivoAdjunto1 { get; set; }
        public bool FlgEstado { get; set; }
    }
}
