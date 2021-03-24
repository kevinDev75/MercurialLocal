using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.Master.ProfessionalEnvironment
{
    public class ProfessionalEnvironmentCandidateDetail
    {
        public int IdEntornoProf { get; set; }
        public int ItemEntornoProf { get; set; }
        public string Empresa { get; set; }
        public string Cargo { get; set; }
        public string TiempoLaborado { get; set; }
        public string JefeInmediato { get; set; }
        public string Telefonos { get; set; }
        
    }
}
