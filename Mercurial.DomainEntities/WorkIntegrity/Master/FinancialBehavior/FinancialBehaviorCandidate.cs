using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.Master.FinancialBehavior
{
    public class FinancialBehaviorCandidate
    {
        
        public long IdComportamientoFinanciero { get; set; }
        public long IdIntegridad { get; set; }
        public int ItemIntegridadDet { get; set; }
        public Archive ArchivoCompFinanciero { get; set; }
        public string ComportamientoFinanciero { get; set; }

    }
}
