using Mercurial.DomainEntities.WorkIntegrity.VM.BasicInformation_Brasil;
using Mercurial.DomainEntities.WorkIntegrity.VM.Conclusion;
using Mercurial.DomainEntities.WorkIntegrity.VM.CriminalRecord;
using Mercurial.DomainEntities.WorkIntegrity.VM.EndResult;
using Mercurial.DomainEntities.WorkIntegrity.VM.FinancialBehavior;
using Mercurial.DomainEntities.WorkIntegrity.VM.FinancialBehavior_Brasil;
using Mercurial.DomainEntities.WorkIntegrity.VM.PhysicalPersonRegistration;
using Mercurial.DomainEntities.WorkIntegrity.VM.PsychologicalTestAnalysisCandidateVM;
using Mercurial.DomainEntities.WorkIntegrity.VM.RegistrationData;
using Mercurial.DomainEntities.WorkIntegrity.VM.ReliabilityTest;

namespace Mercurial.DomainEntities.WorkIntegrity.work270
{
    public class MasterClient270BrasilVM
    {
        public BasicInformation_BrasilCandidateVM oBasicInformation_BrasilVm { get; set; }
        public RegistrationData_ResumeCandidateVM oRegistrationData_ResumeVm { get; set; }
        public FinancialBehaviorCandidateVM oFinancialBehaviorVm { get; set; }
        public CriminalRecordCandidateVM oCriminalRecordVM { get; set; }
        public PsychologicalTestAnalysisCandidateVM oPsychologicalTestAnalysisVm { get; set; }
        public ConclusionCandidateVM oConclusionVm { get; set; }
        public EndResultCandidateVM oEndResultVm { get; set; }

        public FinancialBehavior_BrasilCandidateVM oFinancialBehavior_BrasilVm { get; set; }
        public PhysicalPersonRegistrationCandidateVM oPhysicalPersonRegistrationVm { get; set; }
        public ReliabilityTestCandidateVM oReliabilityTestVm { get; set; }
    }
}
