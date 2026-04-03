using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using StoreSystem.Application.Interface;
using StoreSystem.Core.interfaces.functions;
using StoreSystem.Core.Models.Invoice;

namespace StoreSystem.Application.shared
{
    public class GenerateInvoiceHtmlService : IGenerateInvoiceHtml
    {
        private IGenerateQrCode _GenerateQrCode;
        private IInvoiceProcedure _Invoice;
        public GenerateInvoiceHtmlService(IInvoiceProcedure Invoice,IGenerateQrCode GenerateQrCode)
        {
            _GenerateQrCode = GenerateQrCode;
            _Invoice = Invoice;
        }
        public async Task<string> GenerateInvoiceHtml(InvoiceModel invoice)
        {
            string newId = Guid.NewGuid().ToString();
            await _Invoice.handle(new InvoiceModel()
            {
                Id = newId,
                Items = invoice.Items,
                ClientId = invoice.ClientId ?? null,
            });
            decimal Total = invoice.Items.Sum(x => x.quantity * x.price);
            DateTime Date = DateTime.UtcNow;
          
            var sb = new StringBuilder();
            foreach (var item in invoice.Items)
            {
                sb.Append($@"
                <div class='item'>
                    <span>{item.productName} x{item.quantity}</span>
                    <span>{item.price * item.quantity} MAD</span>
                </div>");
            }
        var qrText = $"Invoice:{newId}|Total:{Total}|Date:{Date:yyyy-MM-dd}";
        var qrBase64 = _GenerateQrCode.GenerateQrCode(qrText);

        return $@"
<!DOCTYPE html>
<html>
<head>
<meta charset='UTF-8'>
<style>
    body {{
        font-family: Tahoma, Arial;
        width: 80mm;
        direction: rtl;
        margin: 0;
        padding: 5px;
    }}
    .center {{ text-align: center; }}
    .line {{
        border-top: 1px dashed black;
        margin: 5px 0;
    }}
    .item {{
        display: flex;
        justify-content: space-between;
        font-size: 12px;
    }}
    .total {{
        font-weight: bold;
        font-size: 14px;
    }}
</style>
</head>

<body>

<div class='center'>
    <h3>متجري</h3>
    <p>phone: 0600000000</p>
</div>

<div class='line'></div>

<p>Date: {Date:yyyy-MM-dd}</p>
<p>invoice id: {newId}</p>

<div class='line'></div>

{sb}

<div class='line'></div>

<div class='item total'>
    <span>Total</span>
    <span>{Total} MAD</span>
</div>

<div class='line'></div>

<div class='center'>
    <img src='data:image/png;base64,{qrBase64}' width='120' />
</div>

<div class='center'>
    <p>Thank You 🙏</p>
</div>

</body>
</html>";
        }
    }
}