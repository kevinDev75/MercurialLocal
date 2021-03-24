using Mercurial.DomainEntities.WorkIntegrity.VM.AcademicLaborAnalysis;
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

namespace Mercurial.DomainEntities.WorkIntegrity.work180plus
{
    public class MasterClient180PlusPeruVM
    {
        public PersonalDataEvaluatedCandidateVM oPersonalDataEvaluatedVm { get; set; }
        public PremiumPersonalHistoryCandidateVM oPremiumPersonalHistoryVm { get; set; }
        public FinancialRecordsAnalysisCandidateVM oFinancialRecordsAnalysisVm { get; set; }
        public AnalysisTestDarkFactorCandidateVM oAnalysisTestDarkFactorVm { get; set; }
        public ConclusionCandidateVM oConclusionVm { get; set; }
        public AnexosCandidateVM oAnexosVm { get; set; }
        public EndResultCandidateVM oEndResultVm { get; set; }
    }
}
