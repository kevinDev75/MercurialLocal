using Mercurial.DomainEntities.WorkIntegrity.Master.EndResult;
using Mercurial.DomainEntities.WorkIntegrity.Master.FinancialRecordsAnalysis;
using Mercurial.DomainEntities.WorkIntegrity.Master.PersonalDataEvaluated;
using Mercurial.DomainEntities.WorkIntegrity.Master.PremiumPersonalHistory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.workbasic
{
    public class MasterEntityBasicPeru
    {
        public PersonalDataEvaluatedCandidate oPersonalDataEvaluatedFlt { get; set; }
        public PremiumPersonalHistoryCandidate oPremiumPersonalHistoryFlt { get; set; }
        public FinancialRecordsAnalysisCandidate oFinancialRecordsAnalysisFlt { get; set; }
        public EndResultCandidate oEndResultFlt { get; set; }
    }
}
