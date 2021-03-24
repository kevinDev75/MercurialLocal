using Mercurial.DomainEntities.WorkIntegrity.Master;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.Cibersecurity.FLT
{
    public class SaveHackeoEticoFlt
    {
        public long IdHackeoEtico { get; set; }
        public int IdEmpresa { get; set; }
        public string Comentario { get; set; }
        public Archive ArchivoAdjunto1 { get; set; }
        public int IdUsuarioEnvio { get; set; }
    }
}
