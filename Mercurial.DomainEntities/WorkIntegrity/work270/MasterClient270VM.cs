using Mercurial.DomainEntities.WorkIntegrity.VM.AcademicLaborAnalysis;
using Mercurial.DomainEntities.WorkIntegrity.VM.AnalysisReliabilityTest;
using Mercurial.DomainEntities.WorkIntegrity.VM.AnalysisTestDarkFactor;
using Mercurial.DomainEntities.WorkIntegrity.VM.AnexosCandidateVM;
using Mercurial.DomainEntities.WorkIntegrity.VM.BasicInformationEvaluated;
using Mercurial.DomainEntities.WorkIntegrity.VM.Conclusion;
using Mercurial.DomainEntities.WorkIntegrity.VM.EndResult;
using Mercurial.DomainEntities.WorkIntegrity.VM.FinancialRecordsAnalysis;
using Mercurial.DomainEntities.WorkIntegrity.VM.HouseCallsAnalysis;
using Mercurial.DomainEntities.WorkIntegrity.VM.PersonalDataEvaluated;
using Mercurial.DomainEntities.WorkIntegrity.VM.PoliticalSocialBackgroundAnalysis;
using Mercurial.DomainEntities.WorkIntegrity.VM.PremiumPersonalHistory;

namespace Mercurial.DomainEntities.WorkIntegrity.work270
{
     public class MasterClient270VM
    {
        public PersonalDataEvaluatedCandidateVM oPersonalDataEvaluatedVm { get; set; }
        public PremiumPersonalHistoryCandidateVM oPremiumPersonalHistoryVm { get; set; }
        public AcademicLaborAnalysisCandidateVM oAcademicLaborAnalysisVm { get; set; }
        public FinancialRecordsAnalysisCandidateVM oFinancialRecordsAnalysisVm { get; set; }
        public PoliticalSocialBackgroundAnalysisCandidateVM oPoliticalSocialBackgroundAnalysisVm { get; set; }
        public AnalysisReliabilityTestCandidateVM oAnalysisReliabilityTestVm { get; set; }
        public ConclusionCandidateVM oConclusionVm { get; set; }
        public AnexosCandidateVM oAnexosVm { get; set; }
        public EndResultCandidateVM oEndResultVm { get; set; }
    }
}
