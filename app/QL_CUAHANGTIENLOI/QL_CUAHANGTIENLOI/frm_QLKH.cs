using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using BLL;

namespace QL_CUAHANGTIENLOI
{
    public partial class frm_QLKH : Form
    {
        BLLUser ubll = new BLLUser();
        public frm_QLKH()
        {
            InitializeComponent();
        }

        public void LoadUser()
        {
            dataGridView1.DataSource = ubll.LoadUser();
        }
        private void frm_QLKH_Load(object sender, EventArgs e)
        {
            LoadUser();
        }
    }
}
