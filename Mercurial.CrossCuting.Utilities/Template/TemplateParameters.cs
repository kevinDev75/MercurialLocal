using Mercurial.DomainEntities.WorkIntegrity.Master;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.CrossCuting.Utilities.Template
{
    public class TemplateParameters
    {
        public string pathFile { get; set; }
        public string  pathOut { get; set; }
        public object generic { get; set; }
        public TemplateEnum.MovementType movementType { get; set; }
        public int idIntegridad { get; set; }
        public int idIntegridadDet { get; set; }
        public List<Archive> ImagesRoute { get; set; }

    }
}
