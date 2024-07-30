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
            CloseAllMdiChildren();
            frm_QLLoaiSP frm = new frm_QLLoaiSP();
            frm.MdiParent = this;
            frm.Show();
        }

        private void quảnLýSảnPhẩmToolStripMenuItem_Click(object sender, EventArgs e)
        {
            CloseAllMdiChildren();
            frm_QLSP frm = new frm_QLSP();
            frm.MdiParent = this;
            frm.Show();
        }

        private void quảnLýNhânViênToolStripMenuItem_Click(object sender, EventArgs e)
        {
            CloseAllMdiChildren();
            frm_QLNV frm = new frm_QLNV();
            frm.MdiParent = this;
            frm.Show();
        }

        private void quảnLýKháchHàngToolStripMenuItem_Click(object sender, EventArgs e)
        {
            CloseAllMdiChildren();
            frm_QLKH frm = new frm_QLKH();
            frm.MdiParent = this;
            frm.Show();
        }
    }
}
