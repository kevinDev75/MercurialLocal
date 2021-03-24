﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.Master.HouseCallsAnalysis
{
    public class HouseCallsAnalysisCandidate
    {
        public long IdAnalisisVisitaDomiciliaria { get; set; }
        public long IdIntegridad { get; set; }
        public int ItemIntegridadDet { get; set; }
        public string Direccion { get; set; }
        public DateTime? FechaEntrevista { get; set; }
        public string HoraEntrevista { get; set; }
        public string PersonasEntrevistadas { get; set; }
        public string Analisis { get; set; }
    }
}
