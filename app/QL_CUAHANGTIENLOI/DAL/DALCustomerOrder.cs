using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DTO;

namespace DAL
{
    public class DALCustomerOrder
    {
        public int UserId { get; set; }
        public int PurchaseCount { get; set; }
        public decimal TotalAmountSpent { get; set; }

        QL_CHTLDataContext qlchtl = new QL_CHTLDataContext();
        public DALCustomerOrder()
        {

        }

        public List<ORDER> LoadOrder()
        {
            return qlchtl.ORDERs.Select(st => st).ToList<ORDER>();
        }


        public double[][] LoadCustomerData(DateTime month)
        {
            var startDate = new DateTime(month.Year, month.Month, 1);
            var endDate = startDate.AddMonths(1).AddDays(-1);

            var groupedOrders = qlchtl.ORDERs
                .Where(o => o.CREATED_AT >= startDate && o.CREATED_AT <= endDate)
                .GroupBy(o => o.USER_ID)
                .Select(g => new
                {
                    UserId = g.Key,
                    PurchaseCount = g.Count(),
                    TotalFee = (double)g.Sum(o => o.FEE)
                })
                .ToList();

            double[][] observations = groupedOrders
                .Select(u => new double[] { u.PurchaseCount, u.TotalFee })
                .ToArray();

            return observations;
        }


        public List<ORDER> GetOrdersForMonth(DateTime month)
        {
            var startDate = new DateTime(month.Year, month.Month, 1);
            var endDate = startDate.AddMonths(1).AddDays(-1);

            var orders = qlchtl.ORDERs
             .Where(o => o.CREATED_AT >= startDate && o.CREATED_AT <= endDate)
             .ToList(); // Chỉ cần lấy danh sách các đối tượng ORDER
            return orders;
        }

        public decimal GetTotalRevenueForMonth(DateTime month)
        {
            var startDate = new DateTime(month.Year, month.Month, 1);
            var endDate = startDate.AddMonths(1).AddDays(-1);

            var totalRevenue = qlchtl.ORDERs
                .Where(o => o.CREATED_AT >= startDate && o.CREATED_AT <= endDate)
                 .Sum(o => (decimal?)o.FEE) ?? 0;

            return totalRevenue;
        }

        public double GetTotalRevenueForCurrentMonth()
        {
            var currentMonth = DateTime.Now;
            var startDate = new DateTime(currentMonth.Year, currentMonth.Month, 1);
            var endDate = startDate.AddMonths(1).AddDays(-1);

            var totalRevenue = qlchtl.ORDERs
                .Where(o => o.CREATED_AT >= startDate && o.CREATED_AT <= endDate)
                 .Sum(o => (double?)o.FEE) ?? 0;

            return totalRevenue;
        }

        public double GetTotalRevenueForPreviousMonth()
        {
            var currentMonth = DateTime.Now;
            var previousMonth = currentMonth.AddMonths(-1);
            var startDate = new DateTime(previousMonth.Year, previousMonth.Month, 1);
            var endDate = startDate.AddMonths(1).AddDays(-1);

            var totalRevenue = qlchtl.ORDERs
                .Where(o => o.CREATED_AT >= startDate && o.CREATED_AT <= endDate)
                 .Sum(o => (double?)o.FEE) ?? 0;

            return totalRevenue;
        }

        public double GetTotalRevenueForToday()
        {
            var today = DateTime.Now.Date; // Chỉ lấy ngày, không bao gồm giờ, phút, giây
            var startDate = today;
            var endDate = today.AddDays(1).AddSeconds(-1); // Kết thúc vào cuối ngày hôm nay

            var totalRevenue = qlchtl.ORDERs
               .Where(o => o.CREATED_AT >= startDate && o.CREATED_AT <= endDate)
                .Sum(o => (double?)o.FEE) ?? 0;

            return totalRevenue;
        }

        public double GetTotalRevenueForYesterday()
        {
            var yesterday = DateTime.Now.Date.AddDays(-1); // Ngày hôm qua
            var startDate = yesterday;
            var endDate = yesterday.AddDays(1).AddSeconds(-1); // Kết thúc vào cuối ngày hôm qua

            var totalRevenue = qlchtl.ORDERs
               .Where(o => o.CREATED_AT >= startDate && o.CREATED_AT <= endDate)
                .Sum(o => (double?)o.FEE) ?? 0;

            return totalRevenue;
        }

        private int GetDistinctCustomerCountForPeriod(DateTime startDate, DateTime endDate)
        {
            return qlchtl.ORDERs
                .Where(o => o.CREATED_AT >= startDate && o.CREATED_AT <= endDate)
                .Select(o => o.USER_ID)
                .Distinct()
                .Count();
        }

        public int GetDistinctCustomerCountForCurrentMonth()
        {
            var currentMonth = DateTime.Now;
            var startDate = new DateTime(currentMonth.Year, currentMonth.Month, 1);
            var endDate = startDate.AddMonths(1).AddDays(-1);

            return GetDistinctCustomerCountForPeriod(startDate, endDate);
        }


        public int GetDistinctCustomerCountForPreviousMonth()
        {
            var currentMonth = DateTime.Now;
            var startDate = new DateTime(currentMonth.Year, currentMonth.Month, 1).AddMonths(-1);
            var endDate = startDate.AddMonths(1).AddDays(-1);

            return GetDistinctCustomerCountForPeriod(startDate, endDate);
        }

        public int GetDistinctCustomerCountForToday()
        {
            var today = DateTime.Today;
            var startDate = today;
            var endDate = today.AddDays(1).AddSeconds(-1);

            return GetDistinctCustomerCountForPeriod(startDate, endDate);
        }

        public int GetDistinctCustomerCountForYesterday()
        {
            var yesterday = DateTime.Today.AddDays(-1);
            var startDate = yesterday;
            var endDate = yesterday.AddDays(1).AddSeconds(-1);

            return GetDistinctCustomerCountForPeriod(startDate, endDate);
        }


    }
}
