using Mercurial.DomainEntities.WorkIntegrity.Master;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.VM.AssessmentEvaluator
{
    public class AssessmentEvaluatorCandidateVM
    {
        public long IdApreciacionEvaluador { get; set; }
        public long IdIntegridad { get; set; }
        public int ItemIntegridadDet { get; set; }
        public string Conclusion { get; set; }
        public string Resultado { get; set; }
        public string RealizadoPor { get; set; }
        public Archive Firma { get; set; }
    }
}
