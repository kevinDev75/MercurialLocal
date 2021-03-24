using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.Master.Polygraph
{
    public class StudyConductedCandidate
    {
        public long IdPoligrafo { get; set; }
        public int ItemEstudioRealizado { get; set; }
        public string DesEstudioRealizado { get; set; }
    }
}
