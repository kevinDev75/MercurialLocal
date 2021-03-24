using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.VM.Polygraph
{
    public class WorkExperienceCandidateVM
    {
        public long IdPoligrafo { get; set; }
        public int ItemExperienciaLaboral { get; set; }
        public string NombreCargo { get; set; }
        public string DescripcionCargo { get; set; }
    }
}
