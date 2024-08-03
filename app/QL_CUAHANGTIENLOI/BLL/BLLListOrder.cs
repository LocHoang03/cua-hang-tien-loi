using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DTO;
using DAL;

namespace BLL
{
    public class BLLListOrder
    {
        DALListOrder lstOrder = new DALListOrder();
        public BLLListOrder() { }

        public List<dynamic> LoadOrder(DateTime date)
        {
            return lstOrder.LoadOrder(date);
        }

        public List<dynamic> LoadOrderProduct(string orderId)
        {
            return lstOrder.LoadOrderProduct(orderId);
        }

        public List<dynamic> SearchOrder(string text, DateTime date)
        {
            return lstOrder.SeacrchOrderFromNameOrPhone(text, date);
        }

        public int currentOrderMonth()
        {
            return lstOrder.GetOrderCountForCurrentMonth();
        }
        public int previousOrderMonth()
        {
            return lstOrder.GetOrderCountForPreviousMonth();
        }

        public int currentCountToday()
        {
            return lstOrder.GetOrderCountForToday();
        }

        public int yesterdayCount()
        {
            return lstOrder.GetOrderCountForYesterday();
        }
    }
}
