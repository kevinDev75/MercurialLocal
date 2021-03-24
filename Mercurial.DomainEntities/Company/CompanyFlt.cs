using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.Company
{
    public class CompanyFlt
    {
        public int IdEmpresa { get; set; }
        public int IdPais { get; set; }
        public int IdTipodocumentoEmpresa { get; set; }
        public string NroDocumento { get; set; }
        public string DescripcionEmpresa { get; set; }
        public bool Flg_Estado { get; set; }
        public List<BranchOfficeFlt> ListBranchOfficeFlt { get; set; }
    }
}
