using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DTO;

namespace DAL
{
    public class DALListOrder
    {
        QL_CHTLDataContext qlchtl = new QL_CHTLDataContext();
        public DALListOrder() { }


        public List<dynamic> LoadOrder(DateTime date)
        {
            var orderData = (from order in qlchtl.ORDERs
                             join user in qlchtl.USERs on order.USER_ID equals user.USER_ID
                             where order.CREATED_AT.Value.Date == date.Date
                             select new
                             {
                                 OrderId = order.ORDER_ID,
                                 CustomerName = user.NAME,
                                 phone = user.PHONE,
                                 TotalAmount = order.FEE,
                                 TotalTransport = order.TRANSPORT_FEE,
                                 CreatedAt = order.CREATED_AT
                             }).ToList<dynamic>();
            return orderData;
        }

        public List<dynamic> LoadOrderProduct(string orderId)
        {
            var orderProductData = (from orderProduct in qlchtl.ORDER_PRODUCTs
                                    join product in qlchtl.PRODUCTs on orderProduct.PRODUCT_ID equals product.PRODUCT_ID
                                    where orderProduct.ORDER_ID == Int32.Parse(orderId)
                                    select new
                                    {
                                        Title = product.TITLE,
                                        Quantity = orderProduct.QUANTITY,
                                        Price = product.PRICE
                                    }).ToList<dynamic>();

            return orderProductData;
        }


        public List<dynamic> SeacrchOrderFromNameOrPhone(string text, DateTime date)
        {
            var orderData = (from order in qlchtl.ORDERs
                             join user in qlchtl.USERs on order.USER_ID equals user.USER_ID
                             where (user.NAME.Contains(text) || user.PHONE == text)
                                 && order.CREATED_AT.Value.Date == date.Date
                             select new
                             {
                                 OrderId = order.ORDER_ID,
                                 CustomerName = user.NAME,
                                 phone = user.PHONE,
                                 TotalAmount = order.FEE,
                                 TotalTransport = order.TRANSPORT_FEE,
                                 CreatedAt = order.CREATED_AT
                             }).ToList<dynamic>();
            return orderData;
        }


        public int GetOrderCountForCurrentMonth()
        {
            // Lấy ngày đầu và ngày cuối của tháng hiện tại
            var currentMonth = DateTime.Now;
            var startDate = new DateTime(currentMonth.Year, currentMonth.Month, 1);
            var endDate = startDate.AddMonths(1).AddDays(-1);

            // Đếm số lượng đơn hàng
            var orderCount = qlchtl.ORDERs
                .Where(o => o.CREATED_AT.HasValue && o.CREATED_AT.Value >= startDate && o.CREATED_AT.Value <= endDate)
                .Count();

            return orderCount;
        }

        public int GetOrderCountForPreviousMonth()
        {
            var currentMonth = DateTime.Now;
            var previousMonth = currentMonth.AddMonths(-1);
            var startDate = new DateTime(previousMonth.Year, previousMonth.Month, 1);
            var endDate = startDate.AddMonths(1).AddDays(-1);

            var orderCount = qlchtl.ORDERs
                .Where(o => o.CREATED_AT.HasValue && o.CREATED_AT.Value >= startDate && o.CREATED_AT.Value <= endDate)
                .Count();

            return orderCount;
        }

        public int GetOrderCountForToday()
        {
            var today = DateTime.Now.Date;
            var startDate = today;
            var endDate = today.AddDays(1).AddTicks(-1);

            var orderCount = qlchtl.ORDERs
                .Where(o => o.CREATED_AT.HasValue && o.CREATED_AT.Value >= startDate && o.CREATED_AT.Value <= endDate)
                .Count();

            return orderCount;
        }

        public int GetOrderCountForYesterday()
        {
            var yesterday = DateTime.Now.Date.AddDays(-1);
            var startDate = yesterday;
            var endDate = yesterday.AddDays(1).AddTicks(-1);

            var orderCount = qlchtl.ORDERs
                .Where(o => o.CREATED_AT.HasValue && o.CREATED_AT.Value >= startDate && o.CREATED_AT.Value <= endDate)
                .Count();

            return orderCount;
        }
    }
}
