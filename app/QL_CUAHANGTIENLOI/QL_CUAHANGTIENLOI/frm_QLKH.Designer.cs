namespace QL_CUAHANGTIENLOI
{
    partial class frm_QLKH
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            System.Windows.Forms.Label nAMELabel;
            System.Windows.Forms.Label eMAILLabel;
            System.Windows.Forms.Label pASSWORDLabel;
            System.Windows.Forms.Label rOLELabel;
            this.groupBox1 = new System.Windows.Forms.GroupBox();
            this.groupBox2 = new System.Windows.Forms.GroupBox();
            this.groupBox3 = new System.Windows.Forms.GroupBox();
            this.btn_TimKiem = new System.Windows.Forms.Button();
            this.txt_TimKiem = new System.Windows.Forms.TextBox();
            this.dataGridView1 = new System.Windows.Forms.DataGridView();
            this.btn_Luu = new System.Windows.Forms.Button();
            this.btn_Sua = new System.Windows.Forms.Button();
            this.btn_Them = new System.Windows.Forms.Button();
            this.btn_Xoa = new System.Windows.Forms.Button();
            this.txt_Email = new emailTextBox.emailTextBox();
            this.txt_Name = new System.Windows.Forms.TextBox();
            this.txt_Password = new System.Windows.Forms.TextBox();
            this.txt_Phone = new System.Windows.Forms.TextBox();
            nAMELabel = new System.Windows.Forms.Label();
            eMAILLabel = new System.Windows.Forms.Label();
            pASSWORDLabel = new System.Windows.Forms.Label();
            rOLELabel = new System.Windows.Forms.Label();
            this.groupBox1.SuspendLayout();
            this.groupBox2.SuspendLayout();
            this.groupBox3.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.dataGridView1)).BeginInit();
            this.SuspendLayout();
            // 
            // groupBox1
            // 
            this.groupBox1.Controls.Add(rOLELabel);
            this.groupBox1.Controls.Add(this.txt_Phone);
            this.groupBox1.Controls.Add(this.txt_Email);
            this.groupBox1.Controls.Add(nAMELabel);
            this.groupBox1.Controls.Add(this.txt_Name);
            this.groupBox1.Controls.Add(eMAILLabel);
            this.groupBox1.Controls.Add(pASSWORDLabel);
            this.groupBox1.Controls.Add(this.txt_Password);
            this.groupBox1.Location = new System.Drawing.Point(32, 29);
            this.groupBox1.Name = "groupBox1";
            this.groupBox1.Size = new System.Drawing.Size(780, 238);
            this.groupBox1.TabIndex = 0;
            this.groupBox1.TabStop = false;
            this.groupBox1.Text = "Thông tin khách hàng";
            // 
            // groupBox2
            // 
            this.groupBox2.Controls.Add(this.dataGridView1);
            this.groupBox2.Location = new System.Drawing.Point(32, 481);
            this.groupBox2.Name = "groupBox2";
            this.groupBox2.Size = new System.Drawing.Size(780, 282);
            this.groupBox2.TabIndex = 1;
            this.groupBox2.TabStop = false;
            this.groupBox2.Text = "Danh sách khách hàng";
            // 
            // groupBox3
            // 
            this.groupBox3.Controls.Add(this.btn_TimKiem);
            this.groupBox3.Controls.Add(this.txt_TimKiem);
            this.groupBox3.Font = new System.Drawing.Font("Arial", 10.2F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.groupBox3.Location = new System.Drawing.Point(90, 384);
            this.groupBox3.Name = "groupBox3";
            this.groupBox3.Size = new System.Drawing.Size(646, 63);
            this.groupBox3.TabIndex = 30;
            this.groupBox3.TabStop = false;
            this.groupBox3.Text = "Tìm kiếm";
            // 
            // btn_TimKiem
            // 
            this.btn_TimKiem.Image = global::QL_CUAHANGTIENLOI.Properties.Resources.btn_search;
            this.btn_TimKiem.Location = new System.Drawing.Point(471, 14);
            this.btn_TimKiem.Name = "btn_TimKiem";
            this.btn_TimKiem.Size = new System.Drawing.Size(88, 43);
            this.btn_TimKiem.TabIndex = 4;
            this.btn_TimKiem.UseVisualStyleBackColor = true;
            // 
            // txt_TimKiem
            // 
            this.txt_TimKiem.Font = new System.Drawing.Font("Arial", 10.8F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.txt_TimKiem.Location = new System.Drawing.Point(52, 26);
            this.txt_TimKiem.Multiline = true;
            this.txt_TimKiem.Name = "txt_TimKiem";
            this.txt_TimKiem.Size = new System.Drawing.Size(384, 26);
            this.txt_TimKiem.TabIndex = 3;
            // 
            // dataGridView1
            // 
            this.dataGridView1.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.dataGridView1.Location = new System.Drawing.Point(7, 32);
            this.dataGridView1.Name = "dataGridView1";
            this.dataGridView1.RowTemplate.Height = 24;
            this.dataGridView1.Size = new System.Drawing.Size(754, 244);
            this.dataGridView1.TabIndex = 0;
            // 
            // btn_Luu
            // 
            this.btn_Luu.Font = new System.Drawing.Font("Arial", 10.2F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btn_Luu.Image = global::QL_CUAHANGTIENLOI.Properties.Resources.btn_save;
            this.btn_Luu.Location = new System.Drawing.Point(572, 292);
            this.btn_Luu.Name = "btn_Luu";
            this.btn_Luu.Size = new System.Drawing.Size(66, 58);
            this.btn_Luu.TabIndex = 25;
            this.btn_Luu.UseVisualStyleBackColor = true;
            // 
            // btn_Sua
            // 
            this.btn_Sua.Font = new System.Drawing.Font("Arial", 10.2F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btn_Sua.Image = global::QL_CUAHANGTIENLOI.Properties.Resources.btn_update;
            this.btn_Sua.Location = new System.Drawing.Point(431, 292);
            this.btn_Sua.Name = "btn_Sua";
            this.btn_Sua.Size = new System.Drawing.Size(66, 58);
            this.btn_Sua.TabIndex = 24;
            this.btn_Sua.UseVisualStyleBackColor = true;
            // 
            // btn_Them
            // 
            this.btn_Them.Font = new System.Drawing.Font("Arial", 10.2F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btn_Them.Image = global::QL_CUAHANGTIENLOI.Properties.Resources.btn_insert;
            this.btn_Them.Location = new System.Drawing.Point(149, 292);
            this.btn_Them.Name = "btn_Them";
            this.btn_Them.Size = new System.Drawing.Size(66, 58);
            this.btn_Them.TabIndex = 22;
            this.btn_Them.UseVisualStyleBackColor = true;
            // 
            // btn_Xoa
            // 
            this.btn_Xoa.Font = new System.Drawing.Font("Arial", 10.2F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btn_Xoa.Image = global::QL_CUAHANGTIENLOI.Properties.Resources.btn_delete;
            this.btn_Xoa.Location = new System.Drawing.Point(287, 292);
            this.btn_Xoa.Name = "btn_Xoa";
            this.btn_Xoa.Size = new System.Drawing.Size(66, 58);
            this.btn_Xoa.TabIndex = 23;
            this.btn_Xoa.UseVisualStyleBackColor = true;
            // 
            // txt_Email
            // 
            this.txt_Email.Location = new System.Drawing.Point(446, 71);
            this.txt_Email.Name = "txt_Email";
            this.txt_Email.Size = new System.Drawing.Size(251, 22);
            this.txt_Email.TabIndex = 16;
            // 
            // nAMELabel
            // 
            nAMELabel.AutoSize = true;
            nAMELabel.Font = new System.Drawing.Font("Arial", 13.2F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            nAMELabel.Location = new System.Drawing.Point(24, 41);
            nAMELabel.Name = "nAMELabel";
            nAMELabel.Size = new System.Drawing.Size(82, 26);
            nAMELabel.TabIndex = 11;
            nAMELabel.Text = "NAME:";
            // 
            // txt_Name
            // 
            this.txt_Name.Location = new System.Drawing.Point(29, 71);
            this.txt_Name.Name = "txt_Name";
            this.txt_Name.Size = new System.Drawing.Size(253, 22);
            this.txt_Name.TabIndex = 12;
            // 
            // eMAILLabel
            // 
            eMAILLabel.AutoSize = true;
            eMAILLabel.Font = new System.Drawing.Font("Arial", 13.2F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            eMAILLabel.Location = new System.Drawing.Point(441, 41);
            eMAILLabel.Name = "eMAILLabel";
            eMAILLabel.Size = new System.Drawing.Size(84, 26);
            eMAILLabel.TabIndex = 13;
            eMAILLabel.Text = "EMAIL:";
            // 
            // pASSWORDLabel
            // 
            pASSWORDLabel.AutoSize = true;
            pASSWORDLabel.Font = new System.Drawing.Font("Arial", 13.2F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            pASSWORDLabel.Location = new System.Drawing.Point(441, 134);
            pASSWORDLabel.Name = "pASSWORDLabel";
            pASSWORDLabel.Size = new System.Drawing.Size(147, 26);
            pASSWORDLabel.TabIndex = 14;
            pASSWORDLabel.Text = "PASSWORD:";
            // 
            // txt_Password
            // 
            this.txt_Password.Location = new System.Drawing.Point(446, 164);
            this.txt_Password.Name = "txt_Password";
            this.txt_Password.Size = new System.Drawing.Size(252, 22);
            this.txt_Password.TabIndex = 15;
            // 
            // rOLELabel
            // 
            rOLELabel.AutoSize = true;
            rOLELabel.Font = new System.Drawing.Font("Arial", 13.2F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            rOLELabel.Location = new System.Drawing.Point(25, 134);
            rOLELabel.Name = "rOLELabel";
            rOLELabel.Size = new System.Drawing.Size(98, 26);
            rOLELabel.TabIndex = 17;
            rOLELabel.Text = "PHONE:";
            // 
            // txt_Phone
            // 
            this.txt_Phone.Location = new System.Drawing.Point(28, 164);
            this.txt_Phone.Name = "txt_Phone";
            this.txt_Phone.Size = new System.Drawing.Size(253, 22);
            this.txt_Phone.TabIndex = 18;
            // 
            // frm_QLKH
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(837, 775);
            this.Controls.Add(this.btn_Luu);
            this.Controls.Add(this.groupBox3);
            this.Controls.Add(this.btn_Sua);
            this.Controls.Add(this.groupBox2);
            this.Controls.Add(this.btn_Them);
            this.Controls.Add(this.btn_Xoa);
            this.Controls.Add(this.groupBox1);
            this.Name = "frm_QLKH";
            this.Text = "frm_QLKH";
            this.Load += new System.EventHandler(this.frm_QLKH_Load);
            this.groupBox1.ResumeLayout(false);
            this.groupBox1.PerformLayout();
            this.groupBox2.ResumeLayout(false);
            this.groupBox3.ResumeLayout(false);
            this.groupBox3.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.dataGridView1)).EndInit();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.GroupBox groupBox1;
        private System.Windows.Forms.GroupBox groupBox2;
        private System.Windows.Forms.DataGridView dataGridView1;
        private System.Windows.Forms.GroupBox groupBox3;
        private System.Windows.Forms.Button btn_TimKiem;
        private System.Windows.Forms.TextBox txt_TimKiem;
        private System.Windows.Forms.Button btn_Luu;
        private System.Windows.Forms.Button btn_Sua;
        private System.Windows.Forms.Button btn_Them;
        private System.Windows.Forms.Button btn_Xoa;
        private emailTextBox.emailTextBox txt_Email;
        private System.Windows.Forms.TextBox txt_Name;
        private System.Windows.Forms.TextBox txt_Password;
        private System.Windows.Forms.TextBox txt_Phone;
    }
}