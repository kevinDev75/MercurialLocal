using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
//using static Mercurial.CrossCuting.Utilities.Enums;

namespace Mercurial.DomainEntities.Home
{
    public class ModelMenu
    {
        public string Description { get; set; }
        public string NumNivel { get; set; }
        //public Status status { get; set; }

        public string idModule { get; set; }
        public string IdMenu { get; set; }
        public string IdSubMenu { get; set; }
        public string Control { get; set; }
        public string View { get; set; }
        public string icon { get; set; }
       
    }
}
