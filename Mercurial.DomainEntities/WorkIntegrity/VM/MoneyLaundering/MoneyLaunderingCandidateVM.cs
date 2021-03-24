using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.VM.MoneyLaundering
{
    public class MoneyLaunderingCandidateVM
    {
        public long IdLavadoActivos { get; set; }
        public long IdIntegridad { get; set; }
        public int ItemIntegridadDet { get; set; }
        public int EvaluaNacionalRiesgo { get; set; }
        public List<MoneyLaunderingCandidateDetailVM> ListMoneyLaunderingDetailVm { get; set; }
    }
}
