using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Mercurial.CrossCuting.Utilities
{
    public class Common
    {
        #region "convert"

        public static string checkString(object value)
        {
            string salida = String.Empty;

            if (value == null)
                salida = String.Empty;
            else
                salida = value.ToString().Trim();

            return salida;
        }

        public static string checkStringNull(object value)
        {
            string salida = null;

            if (value != null)
                salida = value.ToString().Trim();

            return salida;
        }

        public static double checkDouble(object value)
        {
            double salida = 0;
            try
            {
                if (value == null)
                    salida = 0;
                else
                    salida = Convert.ToDouble(value);
            }
            catch (Exception)
            {
                salida = 0;
            }

            return salida;
        }

        public static decimal checkDecimal(object value)
        {
            decimal salida = 0;
            try
            {
                if (value == null)
                    salida = 0;
                else
                    salida = Convert.ToDecimal(value);
            }
            catch (Exception)
            {
                salida = 0;
            }

            return salida;
        }

        public static int checkInt(object value)
        {
            int salida = 0;
            try
            {
                if (value.ToString().Equals(String.Empty) || (value == null))
                    salida = 0;
                else
                    salida = Convert.ToInt32(value);
            }
            catch
            {
                salida = 0;
            }
            return salida;

        }

        public static Nullable<int> checkIntNull(object value)
        {
            Nullable<int> salida = null;

            if (value == null)
                salida = null;
            else
                salida = Convert.ToInt32(value);

            return salida;
        }

        public static DateTime checkDateTime(String value)
        {
            DateTime salida;

            Regex expresionRegular = new Regex(@"^(0?[1-9]|[12][0-9]|3[01])[\/](0?[1-9]|1[012])[\/](19|20)\d{2}$");

            if (!expresionRegular.IsMatch(value))
                salida = Convert.ToDateTime("01/01/1900");
            else
                return Convert.ToDateTime(value);

            return salida;
        }

        public static Nullable<DateTime> checkNullDateTime(String value)
        {
            Nullable<DateTime> salida;

            Regex expresionRegular = new Regex(@"^(0?[1-9]|[12][0-9]|3[01])[\/](0?[1-9]|1[012])[\/](19|20)\d{2}$");

            if (!expresionRegular.IsMatch(value))
                salida = null;
            else
                return Convert.ToDateTime(value);

            return salida;
        }

        public static bool isValidTime(string thetime)
        {
            Regex checktime = new Regex("^(?:0?[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$");
            if (!checktime.IsMatch(thetime))
                return false;

            if (thetime.Trim().Length < 5)
                thetime = String.Format("{0}{1}", 0, thetime);

            string hh = thetime.Substring(0, 2);
            string mm = thetime.Substring(3, 2);

            int hh_i;
            int mm_i;

            if ((int.TryParse(hh, out hh_i)) && (int.TryParse(mm, out mm_i)))
            {
                if ((hh_i >= 0 && hh_i <= 23) && (mm_i >= 0 && mm_i <= 59))
                {
                    return true;
                }
            }
            return false;
        }

        public static bool isValidDateTime(string theDate)
        {
            DateTime tempDate;

            return DateTime.TryParse(theDate, out tempDate) ? true : false;
        }

        #endregion

    }
}
