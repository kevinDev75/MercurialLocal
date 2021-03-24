using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.Master.WorkBackgroundCheck
{
    public class WorkBackgroundCheckCandidateDetail
    {
        public long IdVerifAntecLaboral { get; set; }
        public int ItemVerifAntecLaboral { get; set; }
        public string Periodo { get; set; }
        public int IdSexo { get; set; }
        public string Empresa { get; set; }
        public string Ruc { get; set; }
        public string RubroEmpresa { get; set; }
    }
}
