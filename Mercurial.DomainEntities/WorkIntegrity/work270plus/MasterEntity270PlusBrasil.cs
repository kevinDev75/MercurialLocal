using Mercurial.DomainEntities.WorkIntegrity.Master;
using Mercurial.DomainEntities.WorkIntegrity.Master.BasicCandidateInformation_Brasil;
using Mercurial.DomainEntities.WorkIntegrity.Master.Conclusion;
using Mercurial.DomainEntities.WorkIntegrity.Master.EndResult;
using Mercurial.DomainEntities.WorkIntegrity.Master.FederalRegionalCourts;
using Mercurial.DomainEntities.WorkIntegrity.Master.FinancialBehavior;
using Mercurial.DomainEntities.WorkIntegrity.Master.FinancialBehavior_Brasil;
using Mercurial.DomainEntities.WorkIntegrity.Master.PsychologicalTestAnalysis;
using Mercurial.DomainEntities.WorkIntegrity.Master.RegistrationData;
using Mercurial.DomainEntities.WorkIntegrity.Master.ReliabilityTest;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.work270plus
{
    public class MasterEntity270PlusBrasil
    {
        public BasicDatacandidate oBasicDataFlt { get; set; }
        public RegistrationData_ResumeCandidate oRegistrationData_ResumeFlt { get; set; }
        public FinancialBehaviorCandidate oFinancialBehaviorFlt { get; set; }
        public FederalRegionalCourts_ResumeCandidate oFederalRegionalCourts_ResumeFlt { get; set; }
        public PsychologicalTestAnalysisCandidate oPsychologicalTestAnalysisFlt { get; set; }
        public ConclusionCandidate oConclusionFlt { get; set; }
        public EndResultCandidate oEndResultFlt { get; set; }

        public BasicCandidateInformation_BrasilCandidate oBasicCandidateInformation_BrasilFlt { get; set; }
        public RegistrationDataCandidate oRegistrationDataFlt { get; set; }
        public FinancialBehavior_BrasilCandidate oFinancialBehavior_BrasilFlt { get; set; }
        public FederalRegionalCourtsCandidate oFederalRegionalCourtsFlt { get; set; }
        public ReliabilityTestCandidate oReliabilityTestFlt { get; set; }
    }
}
