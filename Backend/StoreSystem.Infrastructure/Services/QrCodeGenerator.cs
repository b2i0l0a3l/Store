using QRCoder;
using StoreSystem.Application.Interface;

namespace StoreSystem.Infrastructure.Services
{
    public class QrCodeGenerator : IGenerateQrCode
    {
        public string GenerateQrCode(string text)
        {
            using var qrGenerator = new QRCodeGenerator();
            var qrData = qrGenerator.CreateQrCode(text, QRCodeGenerator.ECCLevel.Q);
            var qrCode = new PngByteQRCode(qrData);
            var qrBytes = qrCode.GetGraphic(20);
            return Convert.ToBase64String(qrBytes);
        }
    }
}
