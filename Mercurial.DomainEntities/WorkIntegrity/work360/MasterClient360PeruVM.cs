using Mercurial.DomainEntities.WorkIntegrity.VM.AcademicLaborAnalysis;
using Mercurial.DomainEntities.WorkIntegrity.VM.AnalysisTestDarkFactor;
using Mercurial.DomainEntities.WorkIntegrity.VM.AnexosCandidateVM;
using Mercurial.DomainEntities.WorkIntegrity.VM.AssessmentEvaluator;
using Mercurial.DomainEntities.WorkIntegrity.VM.BasicHousingFeatures;
using Mercurial.DomainEntities.WorkIntegrity.VM.BasicInformationEvaluated;
using Mercurial.DomainEntities.WorkIntegrity.VM.Conclusion;
using Mercurial.DomainEntities.WorkIntegrity.VM.EconomicInformation;
using Mercurial.DomainEntities.WorkIntegrity.VM.EndResult;
using Mercurial.DomainEntities.WorkIntegrity.VM.FamilyEnvironment;
using Mercurial.DomainEntities.WorkIntegrity.VM.FinancialRecordsAnalysis;
using Mercurial.DomainEntities.WorkIntegrity.VM.HouseCallsAnalysis;
using Mercurial.DomainEntities.WorkIntegrity.VM.PersonalDataEvaluated;
using Mercurial.DomainEntities.WorkIntegrity.VM.PhotographicRecord;
using Mercurial.DomainEntities.WorkIntegrity.VM.PoliticalSocialBackgroundAnalysis;
using Mercurial.DomainEntities.WorkIntegrity.VM.PremiumPersonalHistory;
using Mercurial.DomainEntities.WorkIntegrity.VM.ProfessionalEnvironment;

namespace Mercurial.DomainEntities.WorkIntegrity.work360
{
    public class MasterClient360PeruVM
    {
        public PersonalDataEvaluatedCandidateVM oPersonalDataEvaluatedVm { get; set; }
        public PremiumPersonalHistoryCandidateVM oPremiumPersonalHistoryVm { get; set; }
        public AcademicLaborAnalysisCandidateVM oAcademicLaborAnalysisVm { get; set; }
        public FinancialRecordsAnalysisCandidateVM oFinancialRecordsAnalysisVm { get; set; }
        public PoliticalSocialBackgroundAnalysisCandidateVM oPoliticalSocialBackgroundAnalysisVm { get; set; }
        public AnalysisTestDarkFactorCandidateVM oAnalysisTestDarkFactorVm { get; set; }
        public HouseCallsAnalysisCandidateVM oHouseCallsAnalysisVm { get; set; }
        public ConclusionCandidateVM oConclusionVm { get; set; }
        public AnexosCandidateVM oAnexosVm { get; set; }
        //*****************VISITA DOMICILIARIA*****************
        public BasicInformationEvaluatedCandidateVM oBasicInformationEvaluatedVm { get; set; }
        public FamilyEnvironmentCandidateVM oFamilyEnvironmentVm { get; set; }
        public ProfessionalEnvironmentCandidateVM oProfessionalEnvironmentVm { get; set; }
        public EconomicInformationCandidateVM oEconomicInformationVm { get; set; }
        public BasicHousingFeaturesCandidateVM oBasicHousingFeaturesVm { get; set; }
        public AssessmentEvaluatorCandidateVM oAssessmentEvaluatorVm { get; set; }
        public PhotographicRecordCandidateVM oPhotographicRecordVm { get; set; }
        //*****************************************************
        public EndResultCandidateVM oEndResultVm { get; set; }
    }
}
