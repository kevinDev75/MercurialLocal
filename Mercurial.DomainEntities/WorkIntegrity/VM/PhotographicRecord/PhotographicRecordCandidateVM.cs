using Mercurial.DomainEntities.WorkIntegrity.Master;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.VM.PhotographicRecord
{
    public class PhotographicRecordCandidateVM
    {
        public long IdRegistroFotografico { get; set; }
        public long IdIntegridad { get; set; }
        public int ItemIntegridadDet { get; set; }
        public Archive ArchivoAdjunto_EntradaDomicilio { get; set; }
        public string Observaciones_EntradaDomicilio { get; set; }
        public Archive ArchivoAdjunto_AmbSocial { get; set; }
        public string Observaciones_AmbSocial { get; set; }
        public Archive ArchivoAdjunto_Habitaciones { get; set; }
        public string Observaciones_Habitaciones { get; set; }
        public Archive ArchivoAdjunto_Cocina { get; set; }
        public string Observaciones_Cocina { get; set; }
    }
}
