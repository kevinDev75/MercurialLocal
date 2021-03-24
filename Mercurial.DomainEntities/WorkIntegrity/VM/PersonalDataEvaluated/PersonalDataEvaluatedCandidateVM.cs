using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.VM.PersonalDataEvaluated
{
    public class PersonalDataEvaluatedCandidateVM
    {
        public long IdDatoPersonalEvaluado { get; set; }
        public long IdIntegridad { get; set; }
        public int ItemIntegridadDet { get; set; }
        public string NombresApellidos { get; set; }
        public string NroDocumento { get; set; }
        public string FechaInscripcion { get; set; }
        public string FechaExpedicion { get; set; }
        public string Caducidad { get; set; }
        public string Direccion { get; set; }
        public string LugarNacimiento { get; set; }
        public string FechaNacimiento { get; set; }
        public string Nacionalidad { get; set; }
        public int Edad { get; set; }
        public int IdEstadoCivil { get; set; }
        public string DesEstadoCivil { get; set; }
        public string GradoInstruccion { get; set; }
        public string Estatura { get; set; }
        public string NombreMadre { get; set; }
        public string NombrePadre { get; set; }
    }
}
