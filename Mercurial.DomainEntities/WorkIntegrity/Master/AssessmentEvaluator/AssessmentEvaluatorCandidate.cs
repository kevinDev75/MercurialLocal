using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.Master.AssessmentEvaluator
{
    public class AssessmentEvaluatorCandidate
    {
        public AssessmentEvaluatorCandidate()
        {
            this.Firma = new Archive();
        }
        public int IdApreciacionEvaluador { get; set; }
        public int IdIntegridad { get; set; }
        public int ItemIntegridadDet { get; set; }
        public string Conclusion { get; set; }
        public string Resultado { get; set; }
        public string RealizadoPor { get; set; }
        public Archive Firma { get; set; }
    }
}
