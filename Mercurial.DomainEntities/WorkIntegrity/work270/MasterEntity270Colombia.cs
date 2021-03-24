using Mercurial.DomainEntities.WorkIntegrity.Master;
using Mercurial.DomainEntities.WorkIntegrity.Master.AcademicInformation;
using Mercurial.DomainEntities.WorkIntegrity.Master.AnalysisReliabilityTest;
using Mercurial.DomainEntities.WorkIntegrity.Master.Anexos;
using Mercurial.DomainEntities.WorkIntegrity.Master.AssessmentEvaluator;
using Mercurial.DomainEntities.WorkIntegrity.Master.BasicCandidateInfo;
using Mercurial.DomainEntities.WorkIntegrity.Master.BasicHousingFeatures;
using Mercurial.DomainEntities.WorkIntegrity.Master.DarkFactor;
using Mercurial.DomainEntities.WorkIntegrity.Master.DefinitionMilitarySituation;
using Mercurial.DomainEntities.WorkIntegrity.Master.EconomicInformation;
using Mercurial.DomainEntities.WorkIntegrity.Master.EndResult;
using Mercurial.DomainEntities.WorkIntegrity.Master.FamilyEnvironment;
using Mercurial.DomainEntities.WorkIntegrity.Master.FinancialBehavior;
using Mercurial.DomainEntities.WorkIntegrity.Master.FinancialRecordsAnalysis;
using Mercurial.DomainEntities.WorkIntegrity.Master.HealthSituation;
using Mercurial.DomainEntities.WorkIntegrity.Master.JudicialProceeding;
using Mercurial.DomainEntities.WorkIntegrity.Master.MoneyLaundering;
using Mercurial.DomainEntities.WorkIntegrity.Master.NationalRestrictiveLists;
using Mercurial.DomainEntities.WorkIntegrity.Master.PersonalDataEvaluated;
using Mercurial.DomainEntities.WorkIntegrity.Master.PhotographicRecord.cs;
using Mercurial.DomainEntities.WorkIntegrity.Master.PremiumPersonalHistory;
using Mercurial.DomainEntities.WorkIntegrity.Master.ProfessionalEnvironment;
using Mercurial.DomainEntities.WorkIntegrity.Master.SocioeconomicReport;
using Mercurial.DomainEntities.WorkIntegrity.Master.WorkInactivity;

namespace Mercurial.DomainEntities.WorkIntegrity.work270
{
    public class MasterEntity270Colombia
    {
        public BasicDatacandidate oBasicDataFlt { get; set; }
        public JudicialProceedingsCandidate oJudicialProceedingsFlt { get; set; }
        public MoneyLaunderingCandidate oMoneyLaunderingFlt { get; set; }
        public NationalRestrictiveListsCandidate oNationalRestrictiveListsFlt { get; set; }
        public DefinitionMilitarySituationCandidate oDefinitionMilitarySituationFlt { get; set; }
        public FinancialBehaviorCandidate oFinancialBehaviorFlt { get; set; }
        public AnexosCandidate oAnexosFlt { get; set; }

        public SocioeconomicReportCandidate oSocioeconomicReportFlt { get; set; }
        public BasicCandidateInfoCandidate oBasicCandidateInformation { get; set; }
        public AcademicInformationCandidate oAcademicInformationFlt { get; set; }
        public FamilyEnvironmentCandidate oFamilyEnvironmentFlt { get; set; }
        public ProfessionalEnvironmentCandidate oProfessionalEnvironmentFlt { get; set; }
        public WorkInactivityCandidate oWorkInactivityFlt { get; set; }
        public EconomicInformationCandidate oEconomicInformationFlt { get; set; }
        public HealthSituationCandidate oHealthSituationFlt { get; set; }
        public BasicHousingFeaturesCandidate oBasicHousingFeaturesFlt { get; set; }
        public AssessmentEvaluatorCandidate oAssessmentEvaluatorFlt { get; set; }
        public PhotographicRecordCandidate oPhotographicRecordFlt { get; set; }
        public DarkFactorCandidate oDarkFactorFlt { get; set; }

        // --
        public PersonalDataEvaluatedCandidate oPersonalDataEvaluatedFlt { get; set; }
        public EndResultCandidate oEndResultFlt { get; set; }
        public PremiumPersonalHistoryCandidate oPremiumPersonalHistoryFlt { get; set; }
        public FinancialRecordsAnalysisCandidate_Col oFinancialRecordsAnalysis_ColFlt { get; set; }
        public AnalysisReliabilityTestCandidate oAnalysisReliabilityTestFlt { get; set; }
    }
}
