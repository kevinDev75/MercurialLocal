using Mercurial.DomainEntities.WorkIntegrity.VM.AcademicVerification;
using Mercurial.DomainEntities.WorkIntegrity.VM.AnalysisReliabilityTest;
using Mercurial.DomainEntities.WorkIntegrity.VM.AnexosCandidateVM;
using Mercurial.DomainEntities.WorkIntegrity.VM.BasicData;
using Mercurial.DomainEntities.WorkIntegrity.VM.DarkFactor;
using Mercurial.DomainEntities.WorkIntegrity.VM.DefinitionMilitarySituation;
using Mercurial.DomainEntities.WorkIntegrity.VM.EndResult;
using Mercurial.DomainEntities.WorkIntegrity.VM.FinancialBehavior;
using Mercurial.DomainEntities.WorkIntegrity.VM.FinancialRecordsAnalysis;
using Mercurial.DomainEntities.WorkIntegrity.VM.JudicialProceeding;
using Mercurial.DomainEntities.WorkIntegrity.VM.LaborVerification;
using Mercurial.DomainEntities.WorkIntegrity.VM.MoneyLaundering;
using Mercurial.DomainEntities.WorkIntegrity.VM.NationalRestrictiveLists;
using Mercurial.DomainEntities.WorkIntegrity.VM.PersonalDataEvaluated;
using Mercurial.DomainEntities.WorkIntegrity.VM.PremiumPersonalHistory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.work360
{
    public class MasterClient360ColombiaVM
    {
        public BasicDataCandidateVM oBasicDataVm { get; set; }
        public JudicialProceedingsCandidateVM oJudicialProceedingsVm { get; set; }
        public MoneyLaunderingCandidateVM oMoneyLaunderingVm { get; set; }
        public NationalRestrictiveListsCandidateVM oNationalRestrictiveListsVm { get; set; }
        public DefinitionMilitarySituationCandidateVM oDefinitionMilitarySituationVm { get; set; }
        public FinancialBehaviorCandidateVM oFinancialBehaviorVm { get; set; }
        public LaborVerificationCandidateVM oLaborVerificationVm { get; set; }
        public AcademicVerification_ColCandidateVm oAcademicVerification_ColVm { get; set; }
        public AnexosCandidateVM oAnexosVm { get; set; }
        public DarkFactorCandidateVM oDarkFactorVm { get; set; }

        // --
        public PersonalDataEvaluatedCandidateVM oPersonalDataEvaluatedVm { get; set; }
        public EndResultCandidateVM oEndResultVm { get; set; }
        public PremiumPersonalHistoryCandidateVM oPremiumPersonalHistoryVm { get; set; }
        public FinancialRecordsAnalysisCandidate_ColVM oFinancialRecordsAnalysis_ColVm { get; set; }
        public AnalysisReliabilityTestCandidateVM oAnalysisReliabilityTestVm { get; set; }
    }
}
