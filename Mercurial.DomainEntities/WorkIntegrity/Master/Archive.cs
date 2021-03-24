using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.Master
{
    public class Archive
    {
        public long IdArchivoAdjunto { get; set; }
        public string NombreArchivo { get; set; }
        public string RutaArchivo { get; set; }
        public string ExtensionArchivo { get; set; }
        public string FecRegistro { get; set; }
        public int IdUsuarioRegistro { get; set; }
        public string NameTypeFile { get; set; }

        public TypeAdjunte typeAdjunte { get; set; } = TypeAdjunte.image;

        public int order { get; set; } = 0;

        public int widthImage { get; set; } = 250;
        public int HeightImage { get; set; } = 160;
    }
    public enum TypeAdjunte
    {
        image = 0,
        pdf = 1
    }
}
