using System;
using System.Collections.Generic;
using System.ComponentModel.Design;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.CrossCuting.Utilities
{
    public class Enums
    {
        public enum Status
        {
            active = 1,
            inactive = 0
        }

        public enum Method
        {
            POST = 1,
            GET = 0
        }
        public enum Response
        {
            Ok = 1,
            Fail = 0

        }
    }
}
