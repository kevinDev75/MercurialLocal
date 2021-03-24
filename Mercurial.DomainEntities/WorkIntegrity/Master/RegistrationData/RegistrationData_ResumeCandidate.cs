using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.Master.RegistrationData
{
    public class RegistrationData_ResumeCandidate
    {
        public long IdDatosRegistro { get; set; }
        public long IdIntegridad { get; set; }
        public int ItemIntegridadDet { get; set; }
        public string DesDatosRegistro { get; set; }
        public Archive ArchivoAdjunto { get; set; }


    }
}
