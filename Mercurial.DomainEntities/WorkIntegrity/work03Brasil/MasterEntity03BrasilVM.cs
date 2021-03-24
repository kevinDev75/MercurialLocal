using Mercurial.DomainEntities.WorkIntegrity.VM.AnalysisReliabilityTest;
using Mercurial.DomainEntities.WorkIntegrity.VM.AnexosCandidateVM;
using Mercurial.DomainEntities.WorkIntegrity.VM.BasicData;
using Mercurial.DomainEntities.WorkIntegrity.VM.Conclusion;
using Mercurial.DomainEntities.WorkIntegrity.VM.EndResult;
using Mercurial.DomainEntities.WorkIntegrity.VM.InternationalBackgroundAnalysis_Brasil;
using Mercurial.DomainEntities.WorkIntegrity.VM.InternationalRestrictiveLists_Brasil;
using Mercurial.DomainEntities.WorkIntegrity.VM.NationalBackgroundAnalysis_Brasil;
using Mercurial.DomainEntities.WorkIntegrity.VM.NationalRestrictiveLists_Brasil;
using Mercurial.DomainEntities.WorkIntegrity.VM.PersonalDataEvaluated;
using Mercurial.DomainEntities.WorkIntegrity.VM.ReliabilityTest;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.work03Brasil
{
    public class MasterEntity03BrasilVM
    {
        public BasicDataCandidateVM oBasicDataVm { get; set; }
        public InternationalRestrictiveLists_BrasilCandidateVM oInternationalRestrictiveLists_BrasilVm { get; set; }
        public NationalRestrictiveLists_BrasilCandidateVM oNationalRestrictiveLists_BrasilVm { get; set; }
        public ReliabilityTestCandidateVM oReliabilityTestVm { get; set; }
        public PersonalDataEvaluatedCandidateVM oPersonalDataEvaluatedVm { get; set; }
        public EndResultCandidateVM oEndResultVm { get; set; }
        public NationalBackgroundAnalysis_BrasilCandidateVM oNationalBackgroundAnalysis_BrasilVm { get; set; }
        public InternationalBackgroundAnalysis_BrasilCandidateVM oInternationalBackgroundAnalysis_BrasilVm { get; set; }
        public AnalysisReliabilityTestCandidateVM oAnalysisReliabilityTestVm { get; set; }
        public ConclusionCandidateVM oConclusionVm { get; set; }
        public AnexosCandidateVM oAnexosVm { get; set; }
    }
}
