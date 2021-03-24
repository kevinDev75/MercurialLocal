using Mercurial.DomainEntities.WorkIntegrity.Master;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.SafetySecurity.VM
{
    public class AssetSecurityVm
    {
        public long IdSeguridadPatrimonial { get; set; }
        public string Servicio { get; set; }
        public int IdEmpresa { get; set; }
        public string Empresa { get; set; }
        public int IdPais { get; set; }
        public string Pais { get; set; }
        public int IdUsuarioEnvio { get; set; }
        public string UsuarioEnvio { get; set; }
        public string Fecha { get; set; }
        public string FechaHoraReg { get; set; }
        public Archive ArchivoAdjunto1 { get; set; }
        public string Estado { get; set; }
    }
}
