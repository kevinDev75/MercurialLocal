using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.VM.WorkInactivity
{
    public class WorkInactivityCandidateDetailVM
    {
        public int IdInactLaboral { get; set; }
        public int ItemInactLaboral { get; set; }
        public string Periodo { get; set; }
        public string Ocupacion { get; set; }
    }
}
