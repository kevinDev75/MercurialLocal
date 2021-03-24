using Mercurial.DomainEntities.WorkIntegrity.Master;
using Mercurial.DomainEntities.WorkIntegrity.Master.AnalysisReliabilityTest;
using Mercurial.DomainEntities.WorkIntegrity.Master.Anexos;
using Mercurial.DomainEntities.WorkIntegrity.Master.Conclusion;
using Mercurial.DomainEntities.WorkIntegrity.Master.EndResult;
using Mercurial.DomainEntities.WorkIntegrity.Master.InternationalBackgroundAnalysis_Brasil;
using Mercurial.DomainEntities.WorkIntegrity.Master.InternationalRestrictiveLists_Brasil;
using Mercurial.DomainEntities.WorkIntegrity.Master.NationalBackgroundAnalysis_Brasil;
using Mercurial.DomainEntities.WorkIntegrity.Master.NationalRestrictiveLists_Brasil;
using Mercurial.DomainEntities.WorkIntegrity.Master.PersonalDataEvaluated;
using Mercurial.DomainEntities.WorkIntegrity.Master.ReliabilityTest;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.work03Brasil
{
    public class MasterEntity03Brasil
    {
        public BasicDatacandidate oBasicDataFlt { get; set; }
        public InternationalRestrictiveLists_BrasilCandidate oInternationalRestrictiveLists_BrasilFlt { get; set; }
        public NationalRestrictiveLists_BrasilCandidate oNationalRestrictiveLists_BrasilFlt { get; set; }
        public ReliabilityTestCandidate oReliabilityTestFlt { get; set; }
        public PersonalDataEvaluatedCandidate oPersonalDataEvaluatedFlt { get; set; }
        public EndResultCandidate oEndResultFlt { get; set; }
        public NationalBackgroundAnalysis_BrasilCandidate oNationalBackgroundAnalysis_BrasilFlt { get; set; }
        public InternationalBackgroundAnalysis_BrasilCandidate oInternationalBackgroundAnalysis_BrasilFlt { get; set; }
        public AnalysisReliabilityTestCandidate oAnalysisReliabilityTestFlt { get; set; }
        public ConclusionCandidate oConclusionFlt { get; set; }
        public AnexosCandidate oAnexosFlt { get; set; }
    }
}
