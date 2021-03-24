using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.Work
{
    public class CollaboratorWork
    {
        public string IdIntegridad { get; set; }
        public string Item { get; set; }
        public string NombreCompleto { get; set; }
        public DateTime? FechaNacimiento { get; set; }
        public string LugarNacimiento { get; set; }
        public string IdTipoDocIdentidad { get; set; }
        public string DesTipoDocIdentidad { get; set; }
        public string NroDocumento { get; set; }
        public string Telefono { get; set; }
        public string Celular { get; set; }
        public string Departamento { get; set; }
        public string Distrito { get; set; }
        public string Direccion { get; set; }
        public string Email { get; set; }
        public string IdServicio { get; set; }
        public string DescripcionServicio { get; set; }
        public string CodigoIntegridad { get; set; }
        public string IdPais { get; set; }
        public bool FlgServicioGuardado { get; set; }
        public int IdUsuarioAsignado { get; set; }
        public string IdUbigeoPeruDepartamento { get; set; }
        public string IdUbigeoPeruProvincia { get; set; }
        public string IdUbigeoPeruDistrito { get; set; }
    }

    public class CollaboratorWorkVM
    {
        public string IdIntegridad { get; set; }
        public string Item { get; set; }
        public string NombreCompleto { get; set; }
        public string FechaNacimiento { get; set; }
        public string LugarNacimiento { get; set; }
        public string IdTipoDocIdentidad { get; set; }
        public string DesTipoDocIdentidad { get; set; }
        public string NroDocumento { get; set; }
        public string Telefono { get; set; }
        public string Celular { get; set; }
        public string Departamento { get; set; }
        public string Distrito { get; set; }
        public string Direccion { get; set; }
        public string Email { get; set; }
        public string IdServicio { get; set; }
        public string DescripcionServicio { get; set; }
        public string CodigoIntegridad { get; set; }
        public string IdPais { get; set; }
        public bool FlgServicioGuardado { get; set; }
        public int IdUsuarioAsignado { get; set; }
    }
}
