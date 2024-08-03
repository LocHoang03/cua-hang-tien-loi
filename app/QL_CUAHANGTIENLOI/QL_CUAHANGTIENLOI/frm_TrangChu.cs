using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace QL_CUAHANGTIENLOI
{
    public partial class frm_TrangChu : Form
    {

        private bool _isAdmin;

        public frm_TrangChu(bool isAdmin)
        {
            InitializeComponent();
            _isAdmin = isAdmin;

            quảnLýNhânViênToolStripMenuItem.Visible = isAdmin;
            thoongToolStripMenuItem.Visible = isAdmin;
        }
        private void CloseAllMdiChildren()
        {
            foreach (Form frm in this.MdiChildren)
            {
                frm.Close();
            }
        }
        private void quảnLýLoạiSảnPhẩmToolStripMenuItem_Click(object sender, EventArgs e)
        {
            panelMain.Controls.Clear();
            UserControlLoaiSanPham tk = new UserControlLoaiSanPham();
            panelMain.Controls.Add(tk);
            panelMain.Visible = true;
        }

        private void quảnLýSảnPhẩmToolStripMenuItem_Click(object sender, EventArgs e)
        {
            panelMain.Controls.Clear();
            UserControlSanPham tk = new UserControlSanPham();
            panelMain.Controls.Add(tk);
            panelMain.Visible = true;
        }

        private void quảnLýNhânViênToolStripMenuItem_Click(object sender, EventArgs e)
        {
            panelMain.Controls.Clear();
            UserControlNhanVien tk = new UserControlNhanVien();
            panelMain.Controls.Add(tk);
            panelMain.Visible = true;
        }

        private void quảnLýKháchHàngToolStripMenuItem_Click(object sender, EventArgs e)
        {
            panelMain.Controls.Clear();
            UserControlKhachHang tk = new UserControlKhachHang();
            panelMain.Controls.Add(tk);
            panelMain.Visible = true;
        }

        private void doanhThuToolStripMenuItem_Click(object sender, EventArgs e)
        {
            
            panelMain.Controls.Clear();
            DoanhThuLoiNhuan tk = new DoanhThuLoiNhuan();
            panelMain.Controls.Add(tk);
            panelMain.Visible = true;
        }

        private void nhómKháchHàngToolStripMenuItem_Click(object sender, EventArgs e)
        {
            
            panelMain.Controls.Clear();
            ThongKeUserControl tk = new ThongKeUserControl();
            panelMain.Controls.Add(tk);
            panelMain.Visible = true;
        }

        private void quảnLýHóaĐơnToolStripMenuItem_Click(object sender, EventArgs e)
        {
            panelMain.Controls.Clear();
            UserControlHoaDon tk = new UserControlHoaDon();
            panelMain.Controls.Add(tk);
            panelMain.Visible = true;
        }

        
    }
}
