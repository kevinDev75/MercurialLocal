using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.Master.FamilyEnvironment
{
    public class FamilyEnvironmentCandidateDetail
    {
        public int IdEntornoFamiliar { get; set; }
        public int ItemEntornoFamiliar { get; set; }
        public int IdParentesco { get; set; }
        public string Nombres { get; set; }
        public string Edad { get; set; }
        public string NivelEducativo { get; set; }
        public string Ocupacion { get; set; }
        public string EmpresaInstitucion { get; set; }
        public string ConviveConUsted { get; set; }
    }
}
