using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.VM.WorkInactivity
{
    public class WorkInactivityCandidateVM
    {
        public int IdInactLaboral { get; set; }
        public int IdIntegridad { get; set; }
        public int ItemIntegridadDet { get; set; }
        public string RazonCambioEmpleo { get; set; }
        public string MotivoCambioEmpleo { get; set; }
        public string EmpleoIdeal { get; set; }
        public string AspiracionSalarial { get; set; }
        public string ConocimientoEmpresa { get; set; }
        public string HojaVidaAEmpresa { get; set; }
        public string PersonaDentroEmpresa { get; set; }
        public List<WorkInactivityCandidateDetailVM> ListWorkInactivityDetailVm { get; set; }
    }
}
