namespace QL_CUAHANGTIENLOI
{
    partial class UserControlSanPham
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

        #region Component Designer generated code

        /// <summary> 
        /// Required method for Designer support - do not modify 
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            System.Windows.Forms.Label tITLELabel;
            System.Windows.Forms.Label pRICELabel;
            System.Windows.Forms.Label tYPE_IDLabel;
            this.groupBox2 = new System.Windows.Forms.GroupBox();
            this.btn_Reset = new System.Windows.Forms.Button();
            this.btn_TimKiem = new System.Windows.Forms.Button();
            this.txt_TimKiem = new System.Windows.Forms.TextBox();
            this.groupBox1 = new System.Windows.Forms.GroupBox();
            this.groupBox4 = new System.Windows.Forms.GroupBox();
            this.btn_Loc = new System.Windows.Forms.Button();
            this.cbo_Price = new System.Windows.Forms.ComboBox();
            this.cbo_TypeID = new System.Windows.Forms.ComboBox();
            this.image = new System.Windows.Forms.PictureBox();
            this.btn_Luu = new System.Windows.Forms.Button();
            this.btn_Choose = new System.Windows.Forms.Button();
            this.btn_Sua = new System.Windows.Forms.Button();
            this.btn_Xoa = new System.Windows.Forms.Button();
            this.btn_Them = new System.Windows.Forms.Button();
            this.txt_Title = new System.Windows.Forms.TextBox();
            this.txt_Price = new System.Windows.Forms.TextBox();
            this.groupBox3 = new System.Windows.Forms.GroupBox();
            this.dataGridView1 = new System.Windows.Forms.DataGridView();
            tITLELabel = new System.Windows.Forms.Label();
            pRICELabel = new System.Windows.Forms.Label();
            tYPE_IDLabel = new System.Windows.Forms.Label();
            this.groupBox2.SuspendLayout();
            this.groupBox1.SuspendLayout();
            this.groupBox4.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.image)).BeginInit();
            this.groupBox3.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.dataGridView1)).BeginInit();
            this.SuspendLayout();
            // 
            // tITLELabel
            // 
            tITLELabel.AutoSize = true;
            tITLELabel.Font = new System.Drawing.Font("Arial", 13.2F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            tITLELabel.Location = new System.Drawing.Point(33, 39);
            tITLELabel.Name = "tITLELabel";
            tITLELabel.Size = new System.Drawing.Size(82, 26);
            tITLELabel.TabIndex = 2;
            tITLELabel.Text = "TITLE:";
            // 
            // pRICELabel
            // 
            pRICELabel.AutoSize = true;
            pRICELabel.Font = new System.Drawing.Font("Arial", 13.2F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            pRICELabel.Location = new System.Drawing.Point(33, 112);
            pRICELabel.Name = "pRICELabel";
            pRICELabel.Size = new System.Drawing.Size(86, 26);
            pRICELabel.TabIndex = 4;
            pRICELabel.Text = "PRICE:";
            // 
            // tYPE_IDLabel
            // 
            tYPE_IDLabel.AutoSize = true;
            tYPE_IDLabel.Font = new System.Drawing.Font("Arial", 13.2F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            tYPE_IDLabel.Location = new System.Drawing.Point(406, 112);
            tYPE_IDLabel.Name = "tYPE_IDLabel";
            tYPE_IDLabel.Size = new System.Drawing.Size(148, 26);
            tYPE_IDLabel.TabIndex = 10;
            tYPE_IDLabel.Text = "NAME TYPE:";
            // 
            // groupBox2
            // 
            this.groupBox2.Controls.Add(this.btn_Reset);
            this.groupBox2.Controls.Add(this.btn_TimKiem);
            this.groupBox2.Controls.Add(this.txt_TimKiem);
            this.groupBox2.Font = new System.Drawing.Font("Arial", 10.2F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.groupBox2.Location = new System.Drawing.Point(38, 295);
            this.groupBox2.Name = "groupBox2";
            this.groupBox2.Size = new System.Drawing.Size(554, 67);
            this.groupBox2.TabIndex = 34;
            this.groupBox2.TabStop = false;
            this.groupBox2.Text = "Tìm kiếm";
            // 
            // btn_Reset
            // 
            this.btn_Reset.Font = new System.Drawing.Font("Arial", 10.2F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btn_Reset.Location = new System.Drawing.Point(435, 22);
            this.btn_Reset.Name = "btn_Reset";
            this.btn_Reset.Size = new System.Drawing.Size(92, 35);
            this.btn_Reset.TabIndex = 35;
            this.btn_Reset.Text = "Reset";
            this.btn_Reset.UseVisualStyleBackColor = true;
            this.btn_Reset.Click += new System.EventHandler(this.btn_Reset_Click);
            // 
            // btn_TimKiem
            // 
            this.btn_TimKiem.Image = global::QL_CUAHANGTIENLOI.Properties.Resources.btn_search;
            this.btn_TimKiem.Location = new System.Drawing.Point(322, 18);
            this.btn_TimKiem.Name = "btn_TimKiem";
            this.btn_TimKiem.Size = new System.Drawing.Size(88, 43);
            this.btn_TimKiem.TabIndex = 4;
            this.btn_TimKiem.UseVisualStyleBackColor = true;
            this.btn_TimKiem.Click += new System.EventHandler(this.btn_TimKiem_Click);
            // 
            // txt_TimKiem
            // 
            this.txt_TimKiem.Font = new System.Drawing.Font("Arial", 10.8F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.txt_TimKiem.Location = new System.Drawing.Point(26, 26);
            this.txt_TimKiem.Multiline = true;
            this.txt_TimKiem.Name = "txt_TimKiem";
            this.txt_TimKiem.Size = new System.Drawing.Size(271, 26);
            this.txt_TimKiem.TabIndex = 3;
            // 
            // groupBox1
            // 
            this.groupBox1.Controls.Add(this.groupBox4);
            this.groupBox1.Controls.Add(this.cbo_TypeID);
            this.groupBox1.Controls.Add(this.groupBox2);
            this.groupBox1.Controls.Add(this.image);
            this.groupBox1.Controls.Add(this.btn_Luu);
            this.groupBox1.Controls.Add(this.btn_Choose);
            this.groupBox1.Controls.Add(this.btn_Sua);
            this.groupBox1.Controls.Add(tITLELabel);
            this.groupBox1.Controls.Add(this.btn_Xoa);
            this.groupBox1.Controls.Add(this.btn_Them);
            this.groupBox1.Controls.Add(this.txt_Title);
            this.groupBox1.Controls.Add(pRICELabel);
            this.groupBox1.Controls.Add(this.txt_Price);
            this.groupBox1.Controls.Add(tYPE_IDLabel);
            this.groupBox1.Location = new System.Drawing.Point(42, 20);
            this.groupBox1.Name = "groupBox1";
            this.groupBox1.Size = new System.Drawing.Size(1320, 386);
            this.groupBox1.TabIndex = 29;
            this.groupBox1.TabStop = false;
            this.groupBox1.Text = "Thông tin sản phẩm";
            // 
            // groupBox4
            // 
            this.groupBox4.Controls.Add(this.btn_Loc);
            this.groupBox4.Controls.Add(this.cbo_Price);
            this.groupBox4.Location = new System.Drawing.Point(612, 284);
            this.groupBox4.Name = "groupBox4";
            this.groupBox4.Size = new System.Drawing.Size(314, 78);
            this.groupBox4.TabIndex = 36;
            this.groupBox4.TabStop = false;
            this.groupBox4.Text = "Lọc theo giá";
            // 
            // btn_Loc
            // 
            this.btn_Loc.Image = global::QL_CUAHANGTIENLOI.Properties.Resources.btn_filter;
            this.btn_Loc.Location = new System.Drawing.Point(243, 21);
            this.btn_Loc.Name = "btn_Loc";
            this.btn_Loc.Size = new System.Drawing.Size(65, 42);
            this.btn_Loc.TabIndex = 36;
            this.btn_Loc.UseVisualStyleBackColor = true;
            this.btn_Loc.Click += new System.EventHandler(this.btn_Loc_Click);
            // 
            // cbo_Price
            // 
            this.cbo_Price.FormattingEnabled = true;
            this.cbo_Price.Location = new System.Drawing.Point(16, 33);
            this.cbo_Price.Name = "cbo_Price";
            this.cbo_Price.Size = new System.Drawing.Size(213, 24);
            this.cbo_Price.TabIndex = 35;
            // 
            // cbo_TypeID
            // 
            this.cbo_TypeID.FormattingEnabled = true;
            this.cbo_TypeID.Location = new System.Drawing.Point(411, 142);
            this.cbo_TypeID.Name = "cbo_TypeID";
            this.cbo_TypeID.Size = new System.Drawing.Size(275, 24);
            this.cbo_TypeID.TabIndex = 17;
            // 
            // image
            // 
            this.image.BackColor = System.Drawing.SystemColors.AppWorkspace;
            this.image.Location = new System.Drawing.Point(980, 21);
            this.image.Name = "image";
            this.image.Size = new System.Drawing.Size(300, 300);
            this.image.TabIndex = 16;
            this.image.TabStop = false;
            // 
            // btn_Luu
            // 
            this.btn_Luu.Font = new System.Drawing.Font("Arial", 10.2F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btn_Luu.Image = global::QL_CUAHANGTIENLOI.Properties.Resources.btn_save;
            this.btn_Luu.Location = new System.Drawing.Point(569, 196);
            this.btn_Luu.Name = "btn_Luu";
            this.btn_Luu.Size = new System.Drawing.Size(88, 67);
            this.btn_Luu.TabIndex = 33;
            this.btn_Luu.UseVisualStyleBackColor = true;
            this.btn_Luu.Click += new System.EventHandler(this.btn_Luu_Click);
            // 
            // btn_Choose
            // 
            this.btn_Choose.Location = new System.Drawing.Point(1073, 327);
            this.btn_Choose.Name = "btn_Choose";
            this.btn_Choose.Size = new System.Drawing.Size(124, 35);
            this.btn_Choose.TabIndex = 14;
            this.btn_Choose.Text = "Choose Image";
            this.btn_Choose.UseVisualStyleBackColor = true;
            this.btn_Choose.Click += new System.EventHandler(this.btn_Choose_Click);
            // 
            // btn_Sua
            // 
            this.btn_Sua.Font = new System.Drawing.Font("Arial", 10.2F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btn_Sua.Image = global::QL_CUAHANGTIENLOI.Properties.Resources.btn_update;
            this.btn_Sua.Location = new System.Drawing.Point(383, 196);
            this.btn_Sua.Name = "btn_Sua";
            this.btn_Sua.Size = new System.Drawing.Size(88, 67);
            this.btn_Sua.TabIndex = 32;
            this.btn_Sua.UseVisualStyleBackColor = true;
            this.btn_Sua.Click += new System.EventHandler(this.btn_Sua_Click);
            // 
            // btn_Xoa
            // 
            this.btn_Xoa.Font = new System.Drawing.Font("Arial", 10.2F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btn_Xoa.Image = global::QL_CUAHANGTIENLOI.Properties.Resources.btn_delete;
            this.btn_Xoa.Location = new System.Drawing.Point(209, 196);
            this.btn_Xoa.Name = "btn_Xoa";
            this.btn_Xoa.Size = new System.Drawing.Size(88, 67);
            this.btn_Xoa.TabIndex = 31;
            this.btn_Xoa.UseVisualStyleBackColor = true;
            this.btn_Xoa.Click += new System.EventHandler(this.btn_Xoa_Click);
            // 
            // btn_Them
            // 
            this.btn_Them.Font = new System.Drawing.Font("Arial", 10.2F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btn_Them.Image = global::QL_CUAHANGTIENLOI.Properties.Resources.btn_insert;
            this.btn_Them.Location = new System.Drawing.Point(38, 196);
            this.btn_Them.Name = "btn_Them";
            this.btn_Them.Size = new System.Drawing.Size(88, 67);
            this.btn_Them.TabIndex = 30;
            this.btn_Them.UseVisualStyleBackColor = true;
            this.btn_Them.Click += new System.EventHandler(this.btn_Them_Click);
            // 
            // txt_Title
            // 
            this.txt_Title.Location = new System.Drawing.Point(38, 69);
            this.txt_Title.Name = "txt_Title";
            this.txt_Title.Size = new System.Drawing.Size(276, 22);
            this.txt_Title.TabIndex = 3;
            // 
            // txt_Price
            // 
            this.txt_Price.Location = new System.Drawing.Point(37, 142);
            this.txt_Price.Name = "txt_Price";
            this.txt_Price.Size = new System.Drawing.Size(276, 22);
            this.txt_Price.TabIndex = 5;
            // 
            // groupBox3
            // 
            this.groupBox3.Controls.Add(this.dataGridView1);
            this.groupBox3.Location = new System.Drawing.Point(42, 424);
            this.groupBox3.Name = "groupBox3";
            this.groupBox3.Size = new System.Drawing.Size(1320, 312);
            this.groupBox3.TabIndex = 35;
            this.groupBox3.TabStop = false;
            this.groupBox3.Text = "Danh sách sản phẩm";
            // 
            // dataGridView1
            // 
            this.dataGridView1.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.dataGridView1.Location = new System.Drawing.Point(10, 31);
            this.dataGridView1.Name = "dataGridView1";
            this.dataGridView1.RowTemplate.Height = 24;
            this.dataGridView1.Size = new System.Drawing.Size(1304, 275);
            this.dataGridView1.TabIndex = 0;
            this.dataGridView1.SelectionChanged += new System.EventHandler(this.dataGridView1_SelectionChanged);
            // 
            // UserControlSanPham
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.Controls.Add(this.groupBox1);
            this.Controls.Add(this.groupBox3);
            this.Name = "UserControlSanPham";
            this.Size = new System.Drawing.Size(1500, 758);
            this.Load += new System.EventHandler(this.UserControlSanPham_Load);
            this.groupBox2.ResumeLayout(false);
            this.groupBox2.PerformLayout();
            this.groupBox1.ResumeLayout(false);
            this.groupBox1.PerformLayout();
            this.groupBox4.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.image)).EndInit();
            this.groupBox3.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.dataGridView1)).EndInit();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.GroupBox groupBox2;
        private System.Windows.Forms.Button btn_TimKiem;
        private System.Windows.Forms.TextBox txt_TimKiem;
        private System.Windows.Forms.Button btn_Luu;
        private System.Windows.Forms.Button btn_Sua;
        private System.Windows.Forms.Button btn_Them;
        private System.Windows.Forms.Button btn_Xoa;
        private System.Windows.Forms.GroupBox groupBox1;
        private System.Windows.Forms.ComboBox cbo_TypeID;
        private System.Windows.Forms.PictureBox image;
        private System.Windows.Forms.Button btn_Choose;
        private System.Windows.Forms.TextBox txt_Title;
        private System.Windows.Forms.TextBox txt_Price;
        private System.Windows.Forms.GroupBox groupBox3;
        private System.Windows.Forms.DataGridView dataGridView1;
        private System.Windows.Forms.Button btn_Reset;
        private System.Windows.Forms.GroupBox groupBox4;
        private System.Windows.Forms.Button btn_Loc;
        private System.Windows.Forms.ComboBox cbo_Price;
    }
}
