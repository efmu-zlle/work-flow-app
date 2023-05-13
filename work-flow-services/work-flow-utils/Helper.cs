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
    }
}
