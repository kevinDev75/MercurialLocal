using Mercurial.DomainEntities.WorkIntegrity.Master;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.RiskManagement.VM
{
    public class RiskManagementVm
    {
        public long IdGestionRiesgos { get; set; }
        public int IdEmpresa { get; set; }
        public string Empresa { get; set; }
        public int IdSucursal { get; set; }
        public string DescripcionSucursal { get; set; }
        public string Nombre { get; set; }
        public string Link { get; set; }
        public int IdTipoAlerta { get; set; }
        public string DesTipoAlerta { get; set; }
        public int IdPais { get; set; }
        public string Pais { get; set; }
        public int IdUsuarioEnvio { get; set; }
        public string UsuarioEnvio { get; set; }
        public string Fecha { get; set; }
        public string FechaHoraReg { get; set; }
        public Archive ArchivoAdjunto1 { get; set; }
        public Archive ArchivoAdjunto2 { get; set; }
        public string Estado { get; set; }
    }
}
