using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.Company
{
    public class GetCompanyRsl
    {
        public int IdEmpresa { get; set; }
        public int IdPais { get; set; }
        public string Pais { get; set; }
        public int IdTipodocumentoEmpresa { get; set; }
        public string DesTipoDocIdentidad { get; set; }
        public string NroDocumento { get; set; }
        public string DescripcionEmpresa { get; set; }
        public bool Flg_Estado { get; set; }
    }
}
