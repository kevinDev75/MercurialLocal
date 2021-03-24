using Mercurial.DomainEntities.WorkIntegrity.Master;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.VM.Polygraph
{
    public class PolygraphCandidateVM
    {
        public long IdPoligrafo { get; set; }
        public long IdIntegridad { get; set; }
        public long ItemIntegridadDet { get; set; }
        public string Senores { get; set; }
        public Archive FotoAdjunta { get; set; }
        public string Nombre { get; set; }
        public string Direccion { get; set; }
        public string Celular { get; set; }
        public string PuestoPostula { get; set; }
        public string PersonasConvive { get; set; }
        public string TextoExamenPoligrafo { get; set; }
        public List<StudyConductedCandidateVM> ListStudyConductedVm { get; set; }
        public List<WorkExperienceCandidateVM> ListWorkExperienceVm { get; set; }
        public string VacioLaboral { get; set; }
        public string ConductaLaboral { get; set; }
        public string VerificacionAntecedentes { get; set; }
        public string SituacionFinanciera { get; set; }
        public string BebidasAlcoholicas { get; set; }
        public string DrogasIlegales { get; set; }
        public string VinculoPersonasMargenLey { get; set; }
        public string TipoEvaluacionPoligrafica { get; set; }
        public string ExplicacionInstrumentoPoligrafia { get; set; }
        public string TecnicaPoligraficaEmpleada { get; set; }
        public string RepasoPreguntasRealizadasExamen { get; set; }
        public string PreguntasRelevantesExamen { get; set; }
        public string Conclusion { get; set; }
        public string ExamenRealizadoPor { get; set; }
    }
}
