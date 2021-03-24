﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.VM.JobPerformance
{
    public class JobPerformanceCandidateVM
    {
        public long IdDesempenoLaboral { get; set; }
        public long IdIntegridad { get; set; }
        public int ItemIntegridadDet { get; set; }
        public string NombreEmpresa { get; set; }
        public string CargoDesempenado { get; set; }
        public string FechaInicio { get; set; }
        public string FechaTerminacion { get; set; }
        public string MotivoRetiro { get; set; }
        public string NombrePersonBrindaInfo { get; set; }
        public string Cargo { get; set; }
        public string Telefonos_Correo { get; set; }
        public string DescripcionDesempeno { get; set; }
        public string PreguntaVolveriaAContratar { get; set; }
    }
}
