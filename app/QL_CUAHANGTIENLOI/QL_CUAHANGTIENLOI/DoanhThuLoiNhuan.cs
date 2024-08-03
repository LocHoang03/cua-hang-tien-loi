using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using BLL;
using DAL;
using System.Windows.Forms.DataVisualization.Charting;

namespace QL_CUAHANGTIENLOI
{
    public partial class DoanhThuLoiNhuan : UserControl
    {
        BLLCustomerOrder order = new BLLCustomerOrder();
        public DoanhThuLoiNhuan()
        {
            InitializeComponent();
            LoadCharts();
            LoadDT();
        }

        private void LoadDT()
        {
            btn_current_dt.Text = "Doanh thu tháng này: \n" + order.currentRevenueMonth().ToString() + " VND";
            btn_dt.Text = "Doanh thu tháng trước: \n" + order.previousRevenueMonth().ToString() + " VND";
            btn_current_date.Text = "Doanh thu hôm nay: \n" + order.currentRevenueDate().ToString() + " VND";
            btn_date.Text = "Doanh thu hôm qua: \n" + order.yesterdayRevenueDate().ToString() + " VND";
        }

        private void LoadCharts()
        {
            var currentMonth = DateTime.Now;
            var months = Enumerable.Range(0, 7)
                .Select(i => currentMonth.AddMonths(-6 + i))
                .OrderBy(m => m)
                .ToList();

            // Xóa các phần của biểu đồ cũ
            chart1.Series.Clear();
            chart1.ChartAreas.Clear();
            chart1.ChartAreas.Add(new ChartArea("MainArea"));

            // Tạo series cho doanh thu hàng tháng
            var revenueSeries = new Series("Doanh thu tháng ")
            {
                ChartType = SeriesChartType.Column,
                XValueType = ChartValueType.String,
                IsValueShownAsLabel = false,
                IsVisibleInLegend = false
            };
            chart1.Series.Add(revenueSeries);

            // Lặp qua từng tháng
            DALCustomerOrder orderDAL = new DALCustomerOrder();
            foreach (var month in months)
            {
                // Lấy tổng doanh thu cho tháng hiện tại
                var totalRevenue = orderDAL.GetTotalRevenueForMonth(month);

                // Thêm doanh thu vào biểu đồ
                string pointLabel = string.Format("{0:MM/yyyy}", month);
                revenueSeries.Points.AddXY(pointLabel, totalRevenue);
            }

            // Điều chỉnh khoảng cách giữa các cột
            revenueSeries["PointWidth"] = "0.6";

            // Hiển thị số lượng lên trên cột
            foreach (var point in revenueSeries.Points)
            {
                if (point.YValues[0] != 0)
                {
                    point.Label = point.YValues[0].ToString("N0") + " VND";
                }
                else
                {
                    point.Label = "";
                }
            }
        }
    }
}
