using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace work_flow_utils
{
    public static class Helper
    {
        public static string GenerateCode()
        {
            var numbers = "0123456789";
            var random = new Random();
            var result = new string(
                Enumerable.Repeat(numbers, 4)
                          .Select(s => s[random.Next(s.Length)])
                          .ToArray());

            return result;
        }

        public static string GetHash(string input)
        {
            using (var algorithm = SHA256.Create())
            {
                var hashBytes = algorithm.ComputeHash(Encoding.UTF8.GetBytes(input));
                var hash = new StringBuilder();

                foreach (byte b in hashBytes)
                {
                    hash.Append(b.ToString("x2"));
                }

                return hash.ToString();
            }
        }

        public static string GenerateId(int length)
        {

            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            var random = new Random();
            var result = new string(Enumerable.Repeat(chars, length)
                .Select(s => s[random.Next(s.Length)]).ToArray());

            return result;
        }
    }
}
