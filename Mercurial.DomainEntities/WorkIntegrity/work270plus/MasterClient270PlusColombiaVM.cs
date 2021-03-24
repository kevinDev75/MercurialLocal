using Mercurial.DomainEntities.WorkIntegrity.Master;
using Mercurial.DomainEntities.WorkIntegrity.Master.AcademicInformation;
using Mercurial.DomainEntities.WorkIntegrity.Master.AcademicVerification;
using Mercurial.DomainEntities.WorkIntegrity.Master.Anexos;
using Mercurial.DomainEntities.WorkIntegrity.Master.AssessmentEvaluator;
using Mercurial.DomainEntities.WorkIntegrity.Master.BasicCandidateInfo;
using Mercurial.DomainEntities.WorkIntegrity.Master.BasicHousingFeatures;
using Mercurial.DomainEntities.WorkIntegrity.Master.DefinitionMilitarySituation;
using Mercurial.DomainEntities.WorkIntegrity.Master.EconomicInformation;
using Mercurial.DomainEntities.WorkIntegrity.Master.FamilyEnvironment;
using Mercurial.DomainEntities.WorkIntegrity.Master.FinancialBehavior;
using Mercurial.DomainEntities.WorkIntegrity.Master.HealthSituation;
using Mercurial.DomainEntities.WorkIntegrity.Master.JudicialProceeding;
using Mercurial.DomainEntities.WorkIntegrity.Master.LaborVerification;
using Mercurial.DomainEntities.WorkIntegrity.Master.MoneyLaundering;
using Mercurial.DomainEntities.WorkIntegrity.Master.NationalRestrictiveLists;
using Mercurial.DomainEntities.WorkIntegrity.Master.PhotographicRecord.cs;
using Mercurial.DomainEntities.WorkIntegrity.Master.ProfessionalEnvironment;
using Mercurial.DomainEntities.WorkIntegrity.Master.SocioeconomicReport;
using Mercurial.DomainEntities.WorkIntegrity.Master.WorkInactivity;
using Mercurial.DomainEntities.WorkIntegrity.VM.AcademicInformation;
using Mercurial.DomainEntities.WorkIntegrity.VM.AnalysisReliabilityTest;
using Mercurial.DomainEntities.WorkIntegrity.VM.AnexosCandidateVM;
using Mercurial.DomainEntities.WorkIntegrity.VM.AssessmentEvaluator;
using Mercurial.DomainEntities.WorkIntegrity.VM.BasicCandidateInformation;
using Mercurial.DomainEntities.WorkIntegrity.VM.BasicData;
using Mercurial.DomainEntities.WorkIntegrity.VM.BasicHousingFeatures;
using Mercurial.DomainEntities.WorkIntegrity.VM.DefinitionMilitarySituation;
using Mercurial.DomainEntities.WorkIntegrity.VM.EconomicInformation;
using Mercurial.DomainEntities.WorkIntegrity.VM.EndResult;
using Mercurial.DomainEntities.WorkIntegrity.VM.FamilyEnvironment;
using Mercurial.DomainEntities.WorkIntegrity.VM.FinancialBehavior;
using Mercurial.DomainEntities.WorkIntegrity.VM.FinancialRecordsAnalysis;
using Mercurial.DomainEntities.WorkIntegrity.VM.HealthSituation;
using Mercurial.DomainEntities.WorkIntegrity.VM.JudicialProceeding;
using Mercurial.DomainEntities.WorkIntegrity.VM.LaborVerification;
using Mercurial.DomainEntities.WorkIntegrity.VM.MoneyLaundering;
using Mercurial.DomainEntities.WorkIntegrity.VM.NationalRestrictiveLists;
using Mercurial.DomainEntities.WorkIntegrity.VM.PersonalDataEvaluated;
using Mercurial.DomainEntities.WorkIntegrity.VM.PhotographicRecord;
using Mercurial.DomainEntities.WorkIntegrity.VM.PremiumPersonalHistory;
using Mercurial.DomainEntities.WorkIntegrity.VM.ProfessionalEnvironment;
using Mercurial.DomainEntities.WorkIntegrity.VM.ReliabilityTest;
using Mercurial.DomainEntities.WorkIntegrity.VM.SocioeconomicReport;
using Mercurial.DomainEntities.WorkIntegrity.VM.WorkInactivity;

namespace Mercurial.DomainEntities.WorkIntegrity.work270plus
{
    public class MasterClient270PlusColombiaVM
    {
        public BasicDataCandidateVM oBasicDataVm { get; set; }
        public JudicialProceedingsCandidateVM oJudicialProceedingsVm { get; set; }
        public MoneyLaunderingCandidateVM oMoneyLaunderingVm { get; set; }
        public NationalRestrictiveListsCandidateVM oNationalRestrictiveListsVm { get; set; }
        public DefinitionMilitarySituationCandidateVM oDefinitionMilitarySituationVm { get; set; }
        public FinancialBehaviorCandidateVM oFinancialBehaviorVm { get; set; }
        public LaborVerificationCandidateVM oLaborVerificationVm { get; set; }
        public AcademicVerification_ColCandidate oAcademicVerification_ColVm { get; set; }
        public AnexosCandidateVM oAnexosVm { get; set; }

        public SocioeconomicReportCandidateVM oSocioeconomicReportVm { get; set; }
        public BasicCandidateInformationCandidateVM oBasicCandidateInformationVm { get; set; }
        public AcademicInformationCandidateVM oAcademicInformationVm { get; set; }
        public FamilyEnvironmentCandidateVM oFamilyEnvironmentVm { get; set; }
        public ProfessionalEnvironmentCandidateVM oProfessionalEnvironmentVm { get; set; }
        public WorkInactivityCandidateVM oWorkInactivityVm { get; set; }
        public EconomicInformationCandidateVM oEconomicInformationVm { get; set; }
        public HealthSituationCandidateVM oHealthSituationVm { get; set; }
        public BasicHousingFeaturesCandidateVM oBasicHousingFeaturesVm { get; set; }
        public AssessmentEvaluatorCandidateVM oAssessmentEvaluatorVm { get; set; }
        public PhotographicRecordCandidateVM oPhotographicRecordVm { get; set; }
        public ReliabilityTestCandidateVM oReliabilityTestVm { get; set; }

        // --
        public PersonalDataEvaluatedCandidateVM oPersonalDataEvaluatedVm { get; set; }
        public EndResultCandidateVM oEndResultVm { get; set; }
        public PremiumPersonalHistoryCandidateVM oPremiumPersonalHistoryVm { get; set; }
        public FinancialRecordsAnalysisCandidate_ColVM oFinancialRecordsAnalysis_ColVm { get; set; }
        public AnalysisReliabilityTestCandidateVM oAnalysisReliabilityTestVm { get; set; }
    }
}
