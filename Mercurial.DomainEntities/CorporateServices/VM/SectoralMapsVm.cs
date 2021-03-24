using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.CorporateServices.VM
{
    public class SectoralMapsVm
    {
        public long IdMapaSectorial { get; set; }
        public int IdEmpresa { get; set; }
        public string Empresa { get; set; }
        public string Pais { get; set; }
        public int IdUsuarioEnvio { get; set; }
        public string UsuarioEnvio { get; set; }
        public string Fecha { get; set; }
        public string FechaHoraReg { get; set; }
        public string Nombre { get; set; }
        public string Link { get; set; }
        public string Estado { get; set; }
    }
}
