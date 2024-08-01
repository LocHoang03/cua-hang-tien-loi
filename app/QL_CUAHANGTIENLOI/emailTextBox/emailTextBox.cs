using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Text.RegularExpressions;

namespace emailTextBox
{
    public class emailTextBox: TextBox
    {
        ErrorProvider error;
        public emailTextBox()
        {
            this.KeyPress += MailTextBox_KeyPress;
            this.error = new ErrorProvider();
        }

        void MailTextBox_KeyPress(object sender, KeyPressEventArgs e)
        {
            Regex regex = new Regex(@"^[^@\s]+@[^@\s]+\.[^@\s]+$");
            String email = this.Text;
            Match match = regex.Match(email);

            if (match.Success)
                error.Clear();
            else
                error.SetError(this, "Email is not valid.");
        }

    }
}
