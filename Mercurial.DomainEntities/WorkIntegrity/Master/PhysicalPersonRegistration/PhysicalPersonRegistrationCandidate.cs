using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.Master.PhysicalPersonRegistration
{
    public class PhysicalPersonRegistrationCandidate
    {
        public long IdRegistroPersonaFisica { get; set; }
        public long IdIntegridad { get; set; }
        public int ItemIntegridadDet { get; set; }
        public string Proceso { get; set; }
    }
}
