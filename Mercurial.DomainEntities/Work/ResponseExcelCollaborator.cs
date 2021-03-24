using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.Work
{
    public class ResponseExcelCollaborator
    {
        public string Resp { get; set; }
        public int IdPais { get; set; }
        public Boolean IsSuccess { get; set; }
        public int Item { get; set; }
        public string NombreCompleto { get; set; }
        public string FechaNacimiento { get; set; }
        public string LugarNacimiento { get; set; }
        public int IdTipoDocIdentidad { get; set; }
        public string DesTipoDocIdentidad { get; set; }
        public string NroDocumento { get; set; }
        public string Telefono { get; set; }
        public string Celular { get; set; }
        public string Departamento { get; set; }
        public string Distrito { get; set; }
        public string Direccion { get; set; }
        public string Email { get; set; }
        public int IdServicio { get; set; } 
        public string DescripcionServicio { get; set; }
    }
}
