using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;

namespace AppMercurial.Controllers
{
    public class Encryptor
    {
        static readonly string clave = "cadenadecifrado"; // Clave de cifrado. NOTA: Puede ser cualquier combinación de carácteres.

        //public static string Encrypt(string plainText)
        //{
        //    if (plainText == null)
        //    {
        //        return null;
        //    }
        //    // Get the bytes of the string
        //    var bytesToBeEncrypted = Encoding.UTF8.GetBytes(plainText);
        //    var passwordBytes = Encoding.UTF8.GetBytes(password);

        //    // Hash the password with SHA256
        //    passwordBytes = SHA512.Create().ComputeHash(passwordBytes);

        //    var bytesEncrypted = Encrypt(bytesToBeEncrypted, passwordBytes);

        //    return Convert.ToBase64String(bytesEncrypted);
        //}

        public static string Encrypt(string cadena)
        {
            byte[] llave; //Arreglo donde guardaremos la llave para el cifrado 3DES.
            byte[] arreglo = UTF8Encoding.UTF8.GetBytes(cadena); //Arreglo donde guardaremos la cadena descifrada.
            // Ciframos utilizando el Algoritmo MD5.
            MD5CryptoServiceProvider md5 = new MD5CryptoServiceProvider();
            llave = md5.ComputeHash(UTF8Encoding.UTF8.GetBytes(clave));
            md5.Clear();
            //Ciframos utilizando el Algoritmo 3DES.
            TripleDESCryptoServiceProvider tripledes = new TripleDESCryptoServiceProvider();
            tripledes.Key = llave;
            tripledes.Mode = CipherMode.ECB;
            tripledes.Padding = PaddingMode.PKCS7;
            ICryptoTransform convertir = tripledes.CreateEncryptor(); // Iniciamos la conversión de la cadena
            byte[] resultado = convertir.TransformFinalBlock(arreglo, 0, arreglo.Length); //Arreglo de bytes donde guardaremos la cadena cifrada.
            tripledes.Clear();
            return Convert.ToBase64String(resultado, 0, resultado.Length); // Convertimos la cadena y la regresamos.
        }

        public static string Decrypt(string encryptedText)
        {
            byte[] llave;
            byte[] arreglo = Convert.FromBase64String(encryptedText); // Arreglo donde guardaremos la cadena descovertida.
            // Ciframos utilizando el Algoritmo MD5.
            MD5CryptoServiceProvider md5 = new MD5CryptoServiceProvider();
            llave = md5.ComputeHash(UTF8Encoding.UTF8.GetBytes(clave));
            md5.Clear();
            //Ciframos utilizando el Algoritmo 3DES.
            TripleDESCryptoServiceProvider tripledes = new TripleDESCryptoServiceProvider();
            tripledes.Key = llave;
            tripledes.Mode = CipherMode.ECB;
            tripledes.Padding = PaddingMode.PKCS7;
            ICryptoTransform convertir = tripledes.CreateDecryptor();
            byte[] resultado = convertir.TransformFinalBlock(arreglo, 0, arreglo.Length);
            tripledes.Clear();
            string cadena_descifrada = UTF8Encoding.UTF8.GetString(resultado); // Obtenemos la cadena
            return cadena_descifrada; // Devolvemos la cadena
        }



    }
}