using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.VM.WorkBackgroundCheck
{
    public class WorkBackgroundCheckCandidateDetailVM
    {
        public long IdVerifAntecLaboral { get; set; }
        public int ItemVerifAntecLaboral { get; set; }
        public string Periodo { get; set; }
        public string IdSexo { get; set; }
        public string DesSexo { get; set; }
        public string Empresa { get; set; }
        public string Ruc { get; set; }
        public string RubroEmpresa { get; set; }
    }
}
