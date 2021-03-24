using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.Work
{
    public class GetBranchOfficesIntegrity
    {
        public int IdSucursal { get; set; }
        public int IdEmpresa { get; set; }
        public int IdPais { get; set; }
        public string DescripcionSucursal { get; set; }
        public bool Flg_Estado { get; set; }
    }
}
