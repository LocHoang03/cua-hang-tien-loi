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

namespace QL_CUAHANGTIENLOI
{
    public partial class UserControlHoaDon : UserControl
    {
        BLLListOrder lstOrder = new BLLListOrder();
        public UserControlHoaDon()
        {
            InitializeComponent();
            LoadOrder();
        }

        private void LoadOrder()
        {
            btn_hd.Text = "Tổng số hóa đơn tháng này: " + lstOrder.currentOrderMonth().ToString();
            btn_previous_hd.Text = "Tổng số hóa đơn tháng trước: " + lstOrder.previousOrderMonth().ToString();
            btn_hd_today.Text = "Tổng số hóa đơn hôm nay: " + lstOrder.currentCountToday().ToString();
            btn_hd_yesterday.Text = "Tổng số hóa đơn hôm qua: " + lstOrder.yesterdayCount().ToString();
        }

        private void dataGridView1_CellClick(object sender, DataGridViewCellEventArgs e)
        {
            if (dataGridView1.CurrentRow == null)
            {
                dataGridView2.DataSource = null;
                return;
            }

            if (dataGridView1.CurrentRow.Cells[0].Value == null)
            {
                dataGridView2.DataSource = null;
                return;
            }

            string productId = dataGridView1.CurrentRow.Cells[0].Value.ToString();

            if (string.IsNullOrEmpty(productId))
            {
                dataGridView2.DataSource = null;
                return;
            }

            if (lstOrder == null)
            {
                dataGridView2.DataSource = null;
                return;
            }

            var orderData = lstOrder.LoadOrderProduct(dataGridView1.CurrentRow.Cells[0].Value.ToString());
            dataGridView2.DataSource = orderData;
            label2.Text = "Danh sách sản phẩm thuộc hóa đơn " + dataGridView1.CurrentRow.Cells[0].Value.ToString();
            dataGridView2.Columns["Title"].HeaderText = "Tên sản phẩm";
            dataGridView2.Columns["Quantity"].HeaderText = "Số lượng";
            dataGridView2.Columns["Price"].HeaderText = "Giá";
        }

        private void UserControlHoaDon_Load(object sender, EventArgs e)
        {
            var orderData = lstOrder.LoadOrder(date.Value);

            if (orderData.Count > 0)
            {
                dataGridView1.DataSource = orderData;
                dataGridView1.Columns["OrderId"].HeaderText = "Mã Đơn Hàng";
                dataGridView1.Columns["CustomerName"].HeaderText = "Tên Khách Hàng";
                dataGridView1.Columns["phone"].HeaderText = "Số điện thoại";
                dataGridView1.Columns["TotalAmount"].HeaderText = "Tổng Tiền";
                dataGridView1.Columns["TotalTransport"].HeaderText = "Phí giao hàng";
                dataGridView1.Columns["CreatedAt"].HeaderText = "Ngày Tạo";

                dataGridView1.CellFormatting += dataGridView1_CellFormatting;
                dataGridView1.DataBindingComplete += dataGridView1_DataBindingComplete;
            }


        }

        void dataGridView1_CellFormatting(object sender, DataGridViewCellFormattingEventArgs e)
        {
            if (dataGridView1.Columns[e.ColumnIndex].Name == "CreatedAt" && e.Value != null)
            {
                DateTime dateValue;
                if (DateTime.TryParse(e.Value.ToString(), out dateValue))
                {
                    e.Value = dateValue.ToString("dd-MM-yyyy");
                    e.FormattingApplied = true;
                }
            }
        }

        void dataGridView1_DataBindingComplete(object sender, DataGridViewBindingCompleteEventArgs e)
        {
            if (dataGridView1.Rows.Count > 0 && dataGridView1.Rows[0].Cells[0].Value != null)
            {
                var orderProductData = lstOrder.LoadOrderProduct(dataGridView1.Rows[0].Cells[0].Value.ToString());

                dataGridView2.DataSource = orderProductData;

                label2.Text = "Danh sách sản phẩm thuộc hóa đơn " + dataGridView1.Rows[0].Cells[0].Value.ToString();

                if (dataGridView2.Columns["Title"] != null)
                {
                    dataGridView2.Columns["Title"].HeaderText = "Tên sản phẩm";
                }

                if (dataGridView2.Columns["Quantity"] != null)
                {
                    dataGridView2.Columns["Quantity"].HeaderText = "Số lượng";
                }

                if (dataGridView2.Columns["Price"] != null)
                {
                    dataGridView2.Columns["Price"].HeaderText = "Giá";
                }
            }
        }

        private void btn_tk_Click(object sender, EventArgs e)
        {
            if (txt_tk.Text != "")
            {
                var orderData = lstOrder.SearchOrder(txt_tk.Text, date.Value);
                if (orderData.Count > 0)
                {
                    dataGridView1.DataSource = orderData;
                    dataGridView1.Columns["OrderId"].HeaderText = "Mã Đơn Hàng";
                    dataGridView1.Columns["CustomerName"].HeaderText = "Tên Khách Hàng";
                    dataGridView1.Columns["phone"].HeaderText = "Số điện thoại";
                    dataGridView1.Columns["TotalAmount"].HeaderText = "Tổng Tiền";
                    dataGridView1.Columns["TotalTransport"].HeaderText = "Phí giao hàng";
                    dataGridView1.Columns["CreatedAt"].HeaderText = "Ngày Tạo";

                    dataGridView1.CellFormatting += dataGridView1_CellFormatting;
                    dataGridView1.DataBindingComplete += dataGridView1_DataBindingComplete;
                }
                else
                {
                    label2.Text = "Danh sách sản phẩm thuộc hóa đơn ";

                    dataGridView1.DataSource = null;
                    dataGridView2.DataSource = null;
                    return;
                }
            }
            else
            {
                UserControlHoaDon_Load(this, null);
            }
            txt_tk.Text = "";
        }

        private void btn_reset_Click(object sender, EventArgs e)
        {
            date.Value = DateTime.Today;
            UserControlHoaDon_Load(this, null);
        }
    }
}
