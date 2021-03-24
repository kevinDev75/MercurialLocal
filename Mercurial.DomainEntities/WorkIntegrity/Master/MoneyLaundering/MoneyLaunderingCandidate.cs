using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.Master.MoneyLaundering
{
    public class MoneyLaunderingCandidate
    {
        public long IdLavadoActivos { get; set; }
        public long IdIntegridad { get; set; }
        public int ItemIntegridadDet { get; set; }
        public int EvaluaNacionalRiesgo { get; set; }
        public List<MoneyLaunderingCandidateDetail> ListMoneyLaunderingDetailFlt { get; set; }
    }
}
