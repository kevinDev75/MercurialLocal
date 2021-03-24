using Mercurial.DomainEntities.WorkIntegrity.Master;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.VM.FinancialBehavior
{
    public class FinancialBehaviorCandidateVM
    {
        public long IdComportamientoFinanciero { get; set; }
        public long IdIntegridad { get; set; }
        public int ItemIntegridadDet { get; set; }
        public Archive ArchivoCompFinanciero { get; set; }
        public string ComportamientoFinanciero { get; set; }
    }
}
