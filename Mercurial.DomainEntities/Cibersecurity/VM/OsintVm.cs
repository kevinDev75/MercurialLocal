using Mercurial.DomainEntities.WorkIntegrity.Master;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.Cibersecurity.VM
{
    public class OsintVm
    {
        public long IdOSINT { get; set; }
        public int IdEmpresa { get; set; }
        public string Empresa { get; set; }
        public int IdPais { get; set; }
        public string Pais { get; set; }
        public string FechaHoraReg { get; set; }
        public string Fecha { get; set; }
        public string Comentario { get; set; }
        public Archive ArchivoAdjunto1 { get; set; }
    }
}
