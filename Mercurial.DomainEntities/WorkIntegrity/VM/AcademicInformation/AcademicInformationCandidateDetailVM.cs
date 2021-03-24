using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.VM.AcademicInformation
{
    public class AcademicInformationCandidateDetailVM
    {
        public int IdInfoAcademica { get; set; }
        public int ItemInfoAcademica { get; set; }
        public string Estudios { get; set; }
        public string Institucion { get; set; }
        public string Titulo { get; set; }
        public string Estado { get; set; }
        public string FecInicio { get; set; }
        public string FecFin { get; set; }
    }
}
