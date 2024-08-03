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
    public partial class ThongKeUserControl : UserControl
    {
        BLLCustomerOrder order = new BLLCustomerOrder();
        public ThongKeUserControl()
        {
            InitializeComponent();
            LoadCharts();
            LoadDT();
        }


        private void LoadDT()
        {
            btn_current_dt.Text = "Số người mua hàng tháng này: " + order.countUserCurrentMonth().ToString();
            btn_dt.Text = "Số người mua hàng tháng trước: " + order.countUserPreviousMonth().ToString();
            btn_current_date.Text = "Số người mua hàng hôm nay: " + order.countUserCurrentDay().ToString();
            btn_date.Text = "Số người mua hàng hôm qua: " + order.countUserYesterday().ToString();
            //string n = "";
            //for (int i = 0; i < order.test().Length; i++)
            //{
            //    n += "Khách hàng " + i + 1 + "thuộc cụm:+ " + order.test()[i] + "\n";
            //}
            //MessageBox.Show(n);
        }


        private void LoadCharts()
        {
            var currentMonth = DateTime.Now;
            var months = Enumerable.Range(0, 6)
                .Select(i => currentMonth.AddMonths(-6 + i))
                .OrderBy(m => m)
                .ToList();

            // Xóa các phần của biểu đồ cũ
            chart1.Series.Clear();
            chart1.ChartAreas.Clear();
            chart1.ChartAreas.Add(new ChartArea("MainArea"));

            // Tạo các series cho từng nhóm khách hàng
            var groupNames = DAL.PhanCumKH_Kmean.GetGroupNames();

            foreach (var groupName in groupNames)
            {
                var series = new Series(groupName)
                {
                    ChartType = SeriesChartType.Column,
                    XValueType = ChartValueType.String,

                };
                chart1.Series.Add(series);
            }


            // Lặp qua từng tháng
            foreach (var month in months)
            {
                // Lấy dữ liệu đơn hàng cho tháng hiện tại
                BLLCustomerOrder orderBLL = new BLLCustomerOrder();
                var orders = orderBLL.loadOrderPhanCum(month);
                if (orders == null || orders.Count() == 0)
                {
                    foreach (var groupName in groupNames)
                    {
                        string pointLabel = string.Format("{0:MM/yyyy}", month);
                        chart1.Series[groupName].Points.AddXY(pointLabel, 0);
                    }
                    continue;
                }
                // Phân loại người dùng
                var classificationResult = DAL.PhanCumKH_Kmean.PhanCum(orders);
                // Thêm dữ liệu vào biểu đồ
                foreach (var groupName in groupNames)
                {
                    int count = classificationResult.ContainsKey(groupName) ? classificationResult[groupName] : 0;
                    string pointLabel = string.Format("{0:MM/yyyy}", month);
                    chart1.Series[groupName].Points.AddXY(pointLabel, count);

                }


            }


            foreach (var series in chart1.Series)
            {
                series["PointWidth"] = "0.8";
            }

            // Hiển thị số lượng lên trên cột
            foreach (var series in chart1.Series)
            {
                foreach (var point in series.Points)
                {
                    if (point.YValues[0] != 0)
                    {
                        point.Label = point.YValues[0].ToString();
                    }
                    else
                    {
                        point.Label = "";
                    }
                }
            }

        }
    }
}
