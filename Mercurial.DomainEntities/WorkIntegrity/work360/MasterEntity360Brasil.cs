using Mercurial.DomainEntities.WorkIntegrity.Master.BasicInformation_Brasil;
using Mercurial.DomainEntities.WorkIntegrity.Master.Conclusion;
using Mercurial.DomainEntities.WorkIntegrity.Master.CriminalRecord;
using Mercurial.DomainEntities.WorkIntegrity.Master.EndResult;
using Mercurial.DomainEntities.WorkIntegrity.Master.FinancialBehavior;
using Mercurial.DomainEntities.WorkIntegrity.Master.FinancialBehavior_Brasil;
using Mercurial.DomainEntities.WorkIntegrity.Master.PhysicalPersonRegistration;
using Mercurial.DomainEntities.WorkIntegrity.Master.PsychologicalTestAnalysis;
using Mercurial.DomainEntities.WorkIntegrity.Master.RegistrationData;
using Mercurial.DomainEntities.WorkIntegrity.Master.ReliabilityTest;


namespace Mercurial.DomainEntities.WorkIntegrity.work360
{
    public class MasterEntity360Brasil
    {
        public BasicInformation_BrasilCandidate oBasicInformation_BrasilFlt { get; set; }
        public RegistrationData_ResumeCandidate oRegistrationData_ResumeFlt { get; set; }
        public FinancialBehaviorCandidate oFinancialBehaviorFlt { get; set; }
        public CriminalRecordCandidate oCriminalRecordFlt { get; set; }
        public PsychologicalTestAnalysisCandidate oPsychologicalTestAnalysisFlt { get; set; }
        public ConclusionCandidate oConclusionFlt { get; set; }
        public EndResultCandidate oEndResultFlt { get; set; }

        public FinancialBehavior_BrasilCandidate oFinancialBehavior_BrasilFlt { get; set; }
        public PhysicalPersonRegistrationCandidate oPhysicalPersonRegistrationFlt { get; set; }
        public ReliabilityTestCandidate oReliabilityTestFlt { get; set; }
    }
}
