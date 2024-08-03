using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class CustomerOrder
    {
        public int UserId { get; set; }
        public decimal Fee { get; set; }
        public DateTime OrderDate { get; set; }
    }
}
