namespace QL_CUAHANGTIENLOI
{
    partial class frm_QLLoaiSP
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
            this.components = new System.ComponentModel.Container();
            System.Windows.Forms.Label nAMETYPELabel;
            System.Windows.Forms.Label label1;
            this.groupBox1 = new System.Windows.Forms.GroupBox();
            this.txt_Flag = new System.Windows.Forms.TextBox();
            this.tYPE_PRODUCTSBindingSource = new System.Windows.Forms.BindingSource(this.components);
            this.qL_CHTL = new QL_CUAHANGTIENLOI.QL_CHTL();
            this.txt_NameType = new System.Windows.Forms.TextBox();
            this.btn_Luu = new System.Windows.Forms.Button();
            this.btn_Sua = new System.Windows.Forms.Button();
            this.btn_Xoa = new System.Windows.Forms.Button();
            this.btn_Them = new System.Windows.Forms.Button();
            this.groupBox3 = new System.Windows.Forms.GroupBox();
            this.dataGridView1 = new System.Windows.Forms.DataGridView();
            this.groupBox2 = new System.Windows.Forms.GroupBox();
            this.btn_TimKiem = new System.Windows.Forms.Button();
            this.txt_TimKiem = new System.Windows.Forms.TextBox();
            this.tYPE_PRODUCTSTableAdapter = new QL_CUAHANGTIENLOI.QL_CHTLTableAdapters.TYPE_PRODUCTSTableAdapter();
            this.tableAdapterManager = new QL_CUAHANGTIENLOI.QL_CHTLTableAdapters.TableAdapterManager();
            nAMETYPELabel = new System.Windows.Forms.Label();
            label1 = new System.Windows.Forms.Label();
            this.groupBox1.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.tYPE_PRODUCTSBindingSource)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.qL_CHTL)).BeginInit();
            this.groupBox3.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.dataGridView1)).BeginInit();
            this.groupBox2.SuspendLayout();
            this.SuspendLayout();
            // 
            // nAMETYPELabel
            // 
            nAMETYPELabel.AutoSize = true;
            nAMETYPELabel.Font = new System.Drawing.Font("Arial", 13.2F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            nAMETYPELabel.Location = new System.Drawing.Point(33, 39);
            nAMETYPELabel.Name = "nAMETYPELabel";
            nAMETYPELabel.Size = new System.Drawing.Size(141, 26);
            nAMETYPELabel.TabIndex = 2;
            nAMETYPELabel.Text = "NAME TYPE";
            // 
            // label1
            // 
            label1.AutoSize = true;
            label1.Font = new System.Drawing.Font("Arial", 13.2F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            label1.Location = new System.Drawing.Point(33, 122);
            label1.Name = "label1";
            label1.Size = new System.Drawing.Size(70, 26);
            label1.TabIndex = 4;
            label1.Text = "FLAG";
            // 
            // groupBox1
            // 
            this.groupBox1.Controls.Add(label1);
            this.groupBox1.Controls.Add(this.txt_Flag);
            this.groupBox1.Controls.Add(nAMETYPELabel);
            this.groupBox1.Controls.Add(this.txt_NameType);
            this.groupBox1.Location = new System.Drawing.Point(56, 40);
            this.groupBox1.Name = "groupBox1";
            this.groupBox1.Size = new System.Drawing.Size(511, 189);
            this.groupBox1.TabIndex = 0;
            this.groupBox1.TabStop = false;
            this.groupBox1.Text = "Thông tin loại sản phẩm";
            // 
            // txt_Flag
            // 
            this.txt_Flag.DataBindings.Add(new System.Windows.Forms.Binding("Text", this.tYPE_PRODUCTSBindingSource, "NAMETYPE", true));
            this.txt_Flag.Location = new System.Drawing.Point(38, 154);
            this.txt_Flag.Name = "txt_Flag";
            this.txt_Flag.Size = new System.Drawing.Size(395, 22);
            this.txt_Flag.TabIndex = 5;
            // 
            // tYPE_PRODUCTSBindingSource
            // 
            this.tYPE_PRODUCTSBindingSource.DataMember = "TYPE_PRODUCTS";
            this.tYPE_PRODUCTSBindingSource.DataSource = this.qL_CHTL;
            // 
            // qL_CHTL
            // 
            this.qL_CHTL.DataSetName = "QL_CHTL";
            this.qL_CHTL.SchemaSerializationMode = System.Data.SchemaSerializationMode.IncludeSchema;
            // 
            // txt_NameType
            // 
            this.txt_NameType.DataBindings.Add(new System.Windows.Forms.Binding("Text", this.tYPE_PRODUCTSBindingSource, "NAMETYPE", true));
            this.txt_NameType.Location = new System.Drawing.Point(38, 71);
            this.txt_NameType.Name = "txt_NameType";
            this.txt_NameType.Size = new System.Drawing.Size(395, 22);
            this.txt_NameType.TabIndex = 3;
            // 
            // btn_Luu
            // 
            this.btn_Luu.Font = new System.Drawing.Font("Arial", 10.2F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btn_Luu.Image = global::QL_CUAHANGTIENLOI.Properties.Resources.btn_save;
            this.btn_Luu.Location = new System.Drawing.Point(479, 235);
            this.btn_Luu.Name = "btn_Luu";
            this.btn_Luu.Size = new System.Drawing.Size(88, 58);
            this.btn_Luu.TabIndex = 13;
            this.btn_Luu.UseVisualStyleBackColor = true;
            this.btn_Luu.Click += new System.EventHandler(this.btn_Luu_Click);
            // 
            // btn_Sua
            // 
            this.btn_Sua.Font = new System.Drawing.Font("Arial", 10.2F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btn_Sua.Image = global::QL_CUAHANGTIENLOI.Properties.Resources.btn_update;
            this.btn_Sua.Location = new System.Drawing.Point(338, 235);
            this.btn_Sua.Name = "btn_Sua";
            this.btn_Sua.Size = new System.Drawing.Size(88, 58);
            this.btn_Sua.TabIndex = 12;
            this.btn_Sua.UseVisualStyleBackColor = true;
            this.btn_Sua.Click += new System.EventHandler(this.btn_Sua_Click);
            // 
            // btn_Xoa
            // 
            this.btn_Xoa.Font = new System.Drawing.Font("Arial", 10.2F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btn_Xoa.Image = global::QL_CUAHANGTIENLOI.Properties.Resources.btn_delete;
            this.btn_Xoa.Location = new System.Drawing.Point(194, 235);
            this.btn_Xoa.Name = "btn_Xoa";
            this.btn_Xoa.Size = new System.Drawing.Size(88, 58);
            this.btn_Xoa.TabIndex = 11;
            this.btn_Xoa.UseVisualStyleBackColor = true;
            this.btn_Xoa.Click += new System.EventHandler(this.btn_Xoa_Click);
            // 
            // btn_Them
            // 
            this.btn_Them.Font = new System.Drawing.Font("Arial", 10.2F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btn_Them.Image = global::QL_CUAHANGTIENLOI.Properties.Resources.btn_insert;
            this.btn_Them.Location = new System.Drawing.Point(56, 235);
            this.btn_Them.Name = "btn_Them";
            this.btn_Them.Size = new System.Drawing.Size(88, 58);
            this.btn_Them.TabIndex = 10;
            this.btn_Them.UseVisualStyleBackColor = true;
            this.btn_Them.Click += new System.EventHandler(this.btn_Them_Click);
            // 
            // groupBox3
            // 
            this.groupBox3.Controls.Add(this.dataGridView1);
            this.groupBox3.Location = new System.Drawing.Point(110, 346);
            this.groupBox3.Name = "groupBox3";
            this.groupBox3.Size = new System.Drawing.Size(767, 314);
            this.groupBox3.TabIndex = 15;
            this.groupBox3.TabStop = false;
            this.groupBox3.Text = "Danh sách loại sản phẩm";
            // 
            // dataGridView1
            // 
            this.dataGridView1.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.dataGridView1.Location = new System.Drawing.Point(19, 36);
            this.dataGridView1.Name = "dataGridView1";
            this.dataGridView1.RowTemplate.Height = 24;
            this.dataGridView1.Size = new System.Drawing.Size(731, 272);
            this.dataGridView1.TabIndex = 0;
            this.dataGridView1.SelectionChanged += new System.EventHandler(this.dataGridView1_SelectionChanged);
            // 
            // groupBox2
            // 
            this.groupBox2.Controls.Add(this.btn_TimKiem);
            this.groupBox2.Controls.Add(this.txt_TimKiem);
            this.groupBox2.Font = new System.Drawing.Font("Arial", 10.2F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.groupBox2.Location = new System.Drawing.Point(599, 130);
            this.groupBox2.Name = "groupBox2";
            this.groupBox2.Size = new System.Drawing.Size(413, 99);
            this.groupBox2.TabIndex = 6;
            this.groupBox2.TabStop = false;
            this.groupBox2.Text = "Tìm kiếm";
            // 
            // btn_TimKiem
            // 
            this.btn_TimKiem.Image = global::QL_CUAHANGTIENLOI.Properties.Resources.btn_search;
            this.btn_TimKiem.Location = new System.Drawing.Point(343, 32);
            this.btn_TimKiem.Name = "btn_TimKiem";
            this.btn_TimKiem.Size = new System.Drawing.Size(47, 44);
            this.btn_TimKiem.TabIndex = 4;
            this.btn_TimKiem.UseVisualStyleBackColor = true;
            // 
            // txt_TimKiem
            // 
            this.txt_TimKiem.Font = new System.Drawing.Font("Arial", 10.8F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.txt_TimKiem.Location = new System.Drawing.Point(29, 40);
            this.txt_TimKiem.Multiline = true;
            this.txt_TimKiem.Name = "txt_TimKiem";
            this.txt_TimKiem.Size = new System.Drawing.Size(290, 30);
            this.txt_TimKiem.TabIndex = 3;
            // 
            // tYPE_PRODUCTSTableAdapter
            // 
            this.tYPE_PRODUCTSTableAdapter.ClearBeforeFill = true;
            // 
            // tableAdapterManager
            // 
            this.tableAdapterManager.BackupDataSetBeforeUpdate = false;
            this.tableAdapterManager.PRODUCTSTableAdapter = null;
            this.tableAdapterManager.TYPE_PRODUCTSTableAdapter = this.tYPE_PRODUCTSTableAdapter;
            this.tableAdapterManager.UpdateOrder = QL_CUAHANGTIENLOI.QL_CHTLTableAdapters.TableAdapterManager.UpdateOrderOption.InsertUpdateDelete;
            this.tableAdapterManager.USERSTableAdapter = null;
            // 
            // frm_QLLoaiSP
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(1024, 672);
            this.Controls.Add(this.groupBox2);
            this.Controls.Add(this.groupBox3);
            this.Controls.Add(this.btn_Luu);
            this.Controls.Add(this.groupBox1);
            this.Controls.Add(this.btn_Sua);
            this.Controls.Add(this.btn_Them);
            this.Controls.Add(this.btn_Xoa);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None;
            this.Name = "frm_QLLoaiSP";
            this.Text = "frm_QLLoaiSP";
            this.Load += new System.EventHandler(this.frm_QLLoaiSP_Load);
            this.groupBox1.ResumeLayout(false);
            this.groupBox1.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.tYPE_PRODUCTSBindingSource)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.qL_CHTL)).EndInit();
            this.groupBox3.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.dataGridView1)).EndInit();
            this.groupBox2.ResumeLayout(false);
            this.groupBox2.PerformLayout();
            this.ResumeLayout(false);

        }

        #endregion

        private QL_CHTL qL_CHTL;
        private System.Windows.Forms.BindingSource tYPE_PRODUCTSBindingSource;
        private QL_CHTLTableAdapters.TYPE_PRODUCTSTableAdapter tYPE_PRODUCTSTableAdapter;
        private QL_CHTLTableAdapters.TableAdapterManager tableAdapterManager;
        private System.Windows.Forms.GroupBox groupBox1;
        private System.Windows.Forms.TextBox txt_NameType;
        private System.Windows.Forms.Button btn_Luu;
        private System.Windows.Forms.Button btn_Sua;
        private System.Windows.Forms.Button btn_Xoa;
        private System.Windows.Forms.Button btn_Them;
        private System.Windows.Forms.GroupBox groupBox3;
        private System.Windows.Forms.GroupBox groupBox2;
        private System.Windows.Forms.Button btn_TimKiem;
        private System.Windows.Forms.TextBox txt_TimKiem;
        private System.Windows.Forms.DataGridView dataGridView1;
        private System.Windows.Forms.TextBox txt_Flag;
    }
}