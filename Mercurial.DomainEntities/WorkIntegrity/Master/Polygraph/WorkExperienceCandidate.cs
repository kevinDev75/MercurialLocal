using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.Master.Polygraph
{
    public class WorkExperienceCandidate
    {
        public long IdPoligrafo { get; set; }
        public int ItemExperienciaLaboral { get; set; }
        public string NombreCargo { get; set; }
        public string DescripcionCargo { get; set; }
    }
}
