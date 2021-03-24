using Mercurial.DomainEntities.WorkIntegrity.Master.AcademicLaborAnalysis;
using Mercurial.DomainEntities.WorkIntegrity.Master.AnalysisTestDarkFactor;
using Mercurial.DomainEntities.WorkIntegrity.Master.Anexos;
using Mercurial.DomainEntities.WorkIntegrity.Master.AssessmentEvaluator;
using Mercurial.DomainEntities.WorkIntegrity.Master.BasicHousingFeatures;
using Mercurial.DomainEntities.WorkIntegrity.Master.BasicInformationEvaluated;
using Mercurial.DomainEntities.WorkIntegrity.Master.Conclusion;
using Mercurial.DomainEntities.WorkIntegrity.Master.EconomicInformation;
using Mercurial.DomainEntities.WorkIntegrity.Master.EndResult;
using Mercurial.DomainEntities.WorkIntegrity.Master.FamilyEnvironment;
using Mercurial.DomainEntities.WorkIntegrity.Master.FinancialRecordsAnalysis;
using Mercurial.DomainEntities.WorkIntegrity.Master.HouseCallsAnalysis;
using Mercurial.DomainEntities.WorkIntegrity.Master.PersonalDataEvaluated;
using Mercurial.DomainEntities.WorkIntegrity.Master.PhotographicRecord.cs;
using Mercurial.DomainEntities.WorkIntegrity.Master.PoliticalSocialBackgroundAnalysis;
using Mercurial.DomainEntities.WorkIntegrity.Master.PremiumPersonalHistory;
using Mercurial.DomainEntities.WorkIntegrity.Master.ProfessionalEnvironment;

namespace Mercurial.DomainEntities.WorkIntegrity.work90plus
{
    public class MasterEntity90PlusPeru
    {
        public PersonalDataEvaluatedCandidate oPersonalDataEvaluatedFlt { get; set; }
        public PremiumPersonalHistoryCandidate oPremiumPersonalHistoryFlt { get; set; }
        public AcademicLaborAnalysisCandidate oAcademicLaborAnalysisFlt { get; set; }
        public FinancialRecordsAnalysisCandidate oFinancialRecordsAnalysisFlt { get; set; }
        public PoliticalSocialBackgroundAnalysisCandidate oPoliticalSocialBackgroundAnalysisFlt { get; set; }
        public HouseCallsAnalysisCandidate oHouseCallsAnalysisFlt { get; set; }
        public ConclusionCandidate oConclusionFlt { get; set; }
        public AnexosCandidate oAnexosFlt { get; set; }
        //***********VISITA DOMICILIARIA*********
        public BasicInformationEvaluatedCandidate oBasicInformationEvaluatedFlt { get; set; }
        public FamilyEnvironmentCandidate oFamilyEnvironmentFlt { get; set; }
        public ProfessionalEnvironmentCandidate oProfessionalEnvironmentFlt { get; set; }
        public EconomicInformationCandidate oEconomicInformationFlt { get; set; }
        public BasicHousingFeaturesCandidate oBasicHousingFeaturesFlt { get; set; }
        public AssessmentEvaluatorCandidate oAssessmentEvaluatorFlt { get; set; }
        public PhotographicRecordCandidate oPhotographicRecordFlt { get; set; }
        //***************************************
        public EndResultCandidate oEndResultFlt { get; set; }
    }
}
