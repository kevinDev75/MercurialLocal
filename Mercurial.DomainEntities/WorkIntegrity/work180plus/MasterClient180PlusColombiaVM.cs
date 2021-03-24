using Mercurial.DomainEntities.WorkIntegrity.VM.AcademicInformation;
using Mercurial.DomainEntities.WorkIntegrity.VM.AnalysisReliabilityTest;
using Mercurial.DomainEntities.WorkIntegrity.VM.AssessmentEvaluator;
using Mercurial.DomainEntities.WorkIntegrity.VM.BackgroundDrugTraffic;
using Mercurial.DomainEntities.WorkIntegrity.VM.BasicCandidateInformation;
using Mercurial.DomainEntities.WorkIntegrity.VM.BasicData;
using Mercurial.DomainEntities.WorkIntegrity.VM.BasicHousingFeatures;
using Mercurial.DomainEntities.WorkIntegrity.VM.CriminalProceeding;
using Mercurial.DomainEntities.WorkIntegrity.VM.DefinitionMilitarySituation;
using Mercurial.DomainEntities.WorkIntegrity.VM.DiscardHomony;
using Mercurial.DomainEntities.WorkIntegrity.VM.EconomicInformation;
using Mercurial.DomainEntities.WorkIntegrity.VM.EndResult;
using Mercurial.DomainEntities.WorkIntegrity.VM.FamilyEnvironment;
using Mercurial.DomainEntities.WorkIntegrity.VM.FinancialBehavior;
using Mercurial.DomainEntities.WorkIntegrity.VM.FinancialVerification;
using Mercurial.DomainEntities.WorkIntegrity.VM.HealthSituation;
using Mercurial.DomainEntities.WorkIntegrity.VM.JudicialProceeding;
using Mercurial.DomainEntities.WorkIntegrity.VM.MoneyLaundering;
using Mercurial.DomainEntities.WorkIntegrity.VM.NationalRestrictiveLists;
using Mercurial.DomainEntities.WorkIntegrity.VM.PersonalDataEvaluated;
using Mercurial.DomainEntities.WorkIntegrity.VM.PhotographicRecord;
using Mercurial.DomainEntities.WorkIntegrity.VM.PoliceProceeding;
using Mercurial.DomainEntities.WorkIntegrity.VM.PremiumPersonalHistory;
using Mercurial.DomainEntities.WorkIntegrity.VM.ProfessionalEnvironment;
using Mercurial.DomainEntities.WorkIntegrity.VM.RegisterMaintenanceDb;
using Mercurial.DomainEntities.WorkIntegrity.VM.ReliabilityTest;
using Mercurial.DomainEntities.WorkIntegrity.VM.SheetReniec;
using Mercurial.DomainEntities.WorkIntegrity.VM.SocioeconomicReport;
using Mercurial.DomainEntities.WorkIntegrity.VM.TerrorismBackground;
using Mercurial.DomainEntities.WorkIntegrity.VM.VerifExcludedPerson;
using Mercurial.DomainEntities.WorkIntegrity.VM.WorkInactivity;

namespace Mercurial.DomainEntities.WorkIntegrity.work180plus
{
    public class MasterClient180PlusColombiaVM
    {
        public BasicDataCandidateVM oBasicDataVm { get; set; }
        public JudicialProceedingsCandidateVM oJudicialProceedingsVm { get; set; }
        public MoneyLaunderingCandidateVM oMoneyLaunderingVm { get; set; }
        public NationalRestrictiveListsCandidateVM oNationalRestrictiveListsVm { get; set; }
        public DefinitionMilitarySituationCandidateVM oDefinitionMilitarySituationVm { get; set; }
        public FinancialBehaviorCandidateVM oFinancialBehaviorVm { get; set; }

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
        public AnalysisReliabilityTestCandidateVM oAnalysisReliabilityTestVm { get; set; }
    }
}
