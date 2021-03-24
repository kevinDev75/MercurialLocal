using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.VM.RegistrationData
{
    public class RegistrationDataCandidateVM
    {
        public long IdDatosRegistro { get; set; }
        public long IdIntegridad { get; set; }
        public int ItemIntegridadDet { get; set; }
        public string EstadoCPF { get; set; }
        public string CalificacionProfesional { get; set; }
        public string ActividadProfesional { get; set; }
        public string GradoEscolaridad { get; set; }
        public string TituloElector { get; set; }
        public string PersonasHogar { get; set; }
        public string Esposa { get; set; }
        public string ChequesFraude { get; set; }
        public string PIS { get; set; }
        public string Obito { get; set; }
    }
}
