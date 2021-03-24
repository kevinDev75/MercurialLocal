using Mercurial.DomainEntities.WorkIntegrity.Master.AcademicLaborAnalysis;
using Mercurial.DomainEntities.WorkIntegrity.Master.AnalysisReliabilityTest;
using Mercurial.DomainEntities.WorkIntegrity.Master.AnalysisTestDarkFactor;
using Mercurial.DomainEntities.WorkIntegrity.Master.Anexos;
using Mercurial.DomainEntities.WorkIntegrity.Master.BasicInformationEvaluated;
using Mercurial.DomainEntities.WorkIntegrity.Master.Conclusion;
using Mercurial.DomainEntities.WorkIntegrity.Master.EndResult;
using Mercurial.DomainEntities.WorkIntegrity.Master.FinancialRecordsAnalysis;
using Mercurial.DomainEntities.WorkIntegrity.Master.HouseCallsAnalysis;
using Mercurial.DomainEntities.WorkIntegrity.Master.PersonalDataEvaluated;
using Mercurial.DomainEntities.WorkIntegrity.Master.PoliticalSocialBackgroundAnalysis;
using Mercurial.DomainEntities.WorkIntegrity.Master.PremiumPersonalHistory;

namespace Mercurial.DomainEntities.WorkIntegrity.work270
{
    public class MasterEntity270
    {
        public PersonalDataEvaluatedCandidate oPersonalDataEvaluatedFlt { get; set; }
        public PremiumPersonalHistoryCandidate oPremiumPersonalHistoryFlt { get; set; }
        public AcademicLaborAnalysisCandidate oAcademicLaborAnalysisFlt { get; set; }
        public FinancialRecordsAnalysisCandidate oFinancialRecordsAnalysisFlt { get; set; }
        public PoliticalSocialBackgroundAnalysisCandidate oPoliticalSocialBackgroundAnalysisFlt { get; set; }
        public AnalysisReliabilityTestCandidate oAnalysisReliabilityTestFlt { get; set; }
        public ConclusionCandidate oConclusionFlt { get; set; }
        public AnexosCandidate oAnexosFlt { get; set; }
        public EndResultCandidate oEndResultFlt { get; set; }

    }
}
