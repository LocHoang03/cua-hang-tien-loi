using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
using DTO;

namespace BLL
{
    public class BLLCustomerOrder
    {
        DALCustomerOrder orderDAL = new DALCustomerOrder();
        PhanCumKH_Kmean pc = new PhanCumKH_Kmean();
        public BLLCustomerOrder()
        {

        }

        public List<ORDER> LoadOrder()
        {
            return orderDAL.LoadOrder();
        }

        public double currentRevenueMonth()
        {
            return orderDAL.GetTotalRevenueForCurrentMonth();
        }
        public double previousRevenueMonth()
        {
            return orderDAL.GetTotalRevenueForPreviousMonth();
        }

        public double currentRevenueDate()
        {
            return orderDAL.GetTotalRevenueForToday();
        }

        public double yesterdayRevenueDate()
        {
            return orderDAL.GetTotalRevenueForYesterday();
        }

        public int countUserCurrentMonth()
        {
            return orderDAL.GetDistinctCustomerCountForCurrentMonth();
        }
        public int countUserPreviousMonth()
        {
            return orderDAL.GetDistinctCustomerCountForPreviousMonth();
        }
        public int countUserCurrentDay()
        {
            return orderDAL.GetDistinctCustomerCountForToday();
        }
        public int countUserYesterday()
        {
            return orderDAL.GetDistinctCustomerCountForYesterday();
        }
        public double[][] loadOrderPhanCum(DateTime month)
        {
            return orderDAL.LoadCustomerData(month);
        }
    }
}
