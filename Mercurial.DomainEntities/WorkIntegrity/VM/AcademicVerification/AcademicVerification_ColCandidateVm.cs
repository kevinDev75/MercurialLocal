using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.VM.AcademicVerification
{
    public class AcademicVerification_ColCandidateVm
    {
        public long IdVerifAcademicasCol { get; set; }
        public long IdIntegridad { get; set; }
        public int ItemIntegridadDet { get; set; }
        public string NombreInstitucion { get; set; }
        public string GradoObtenido { get; set; }
        public string FecFinalizacion { get; set; }
        public string EstudioTerminadoOProceso { get; set; }
        public string Diploma { get; set; }
        public string NombrePersonBrindaInfo { get; set; }
        public string Cargo { get; set; }
        public string Telefono { get; set; }
        public string Correo { get; set; }
        public string Conclusion { get; set; }
    }
}
