using Mercurial.DomainEntities.WorkIntegrity.Master;
using Mercurial.DomainEntities.WorkIntegrity.Master.AnalysisReliabilityTest;
using Mercurial.DomainEntities.WorkIntegrity.Master.DefinitionMilitarySituation;
using Mercurial.DomainEntities.WorkIntegrity.Master.EndResult;
using Mercurial.DomainEntities.WorkIntegrity.Master.FinancialBehavior;
using Mercurial.DomainEntities.WorkIntegrity.Master.JudicialProceeding;
using Mercurial.DomainEntities.WorkIntegrity.Master.MoneyLaundering;
using Mercurial.DomainEntities.WorkIntegrity.Master.NationalRestrictiveLists;
using Mercurial.DomainEntities.WorkIntegrity.Master.PersonalDataEvaluated;
using Mercurial.DomainEntities.WorkIntegrity.Master.PremiumPersonalHistory;
using Mercurial.DomainEntities.WorkIntegrity.Master.ReliabilityTest;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.work180
{
    public class MasterEntity180Colombia
    {
        public BasicDatacandidate oBasicDataFlt { get; set; }
        public JudicialProceedingsCandidate oJudicialProceedingsFlt { get; set; }
        public MoneyLaunderingCandidate oMoneyLaunderingFlt { get; set; }
        public NationalRestrictiveListsCandidate oNationalRestrictiveListsFlt { get; set; }
        public DefinitionMilitarySituationCandidate oDefinitionMilitarySituationFlt { get; set; }
        public FinancialBehaviorCandidate oFinancialBehaviorFlt { get; set; }
        public ReliabilityTestCandidate oReliabilityTestFlt { get; set; }

        // --
        public PersonalDataEvaluatedCandidate oPersonalDataEvaluatedFlt { get; set; }
        public EndResultCandidate oEndResultFlt { get; set; }
        public PremiumPersonalHistoryCandidate oPremiumPersonalHistoryFlt { get; set; }
        public AnalysisReliabilityTestCandidate oAnalysisReliabilityTestFlt { get; set; }
    }
}
