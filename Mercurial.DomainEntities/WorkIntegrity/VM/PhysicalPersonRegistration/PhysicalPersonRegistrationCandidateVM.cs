using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.VM.PhysicalPersonRegistration
{
    public class PhysicalPersonRegistrationCandidateVM
    {
        public long IdRegistroPersonaFisica { get; set; }
        public long IdIntegridad { get; set; }
        public int ItemIntegridadDet { get; set; }
        public string Proceso { get; set; }
    }
}
