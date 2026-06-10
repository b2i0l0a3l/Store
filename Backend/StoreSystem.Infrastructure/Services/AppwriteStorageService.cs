using System.IO;
using Appwrite;
using Appwrite.Models;
using Appwrite.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using StoreSystem.Core.interfaces;
using StoreSystem.Core.Models;

public class AppwriteStorageService : IAppwriteStorageService
{
    private readonly Storage _storage;
    private readonly string _bucketId;
    private readonly string _endpoint;
    private readonly string _projectId;
    private readonly ILogger<AppwriteStorageService> _logger;
    private readonly ICompressImage _compressImage;
    public AppwriteStorageService(ICompressImage compressImage, ILogger<AppwriteStorageService> logger, Client client, IConfiguration configuration)
    {
        _storage = new Storage(client);
        _bucketId = configuration["AppwriteSettings_BucketId"]!;
        _endpoint = configuration["AppwriteSettings_Endpoint"]!;
        _projectId = configuration["AppwriteSettings_ProjectId"]!;
        _logger = logger;
        _compressImage = compressImage;
    }
   
   public async Task<ImageUploadResult?> UploadImageAsync(IFormFile file)
        {
            try
            {
                if (file == null || file.Length == 0) return null;


                byte[] bytes = await _compressImage.CompressImage(file);
                if(bytes == null || bytes.Length == 0) return null;

                var inputFile = InputFile.FromBytes(bytes, file.FileName, file.ContentType);

                var uploadedFile = await _storage.CreateFile(
                    bucketId: _bucketId,
                    fileId: "unique()",
                    file: inputFile
                );

                string imageUrl = $"{_endpoint}/storage/buckets/{_bucketId}/files/{uploadedFile.Id}/view?project={_projectId}";

                return new ImageUploadResult
                {
                    FileId = uploadedFile.Id,
                    ImageUrl = imageUrl
                };            }
            catch(Exception ex){ 
                _logger.LogError(ex, "Error occurred while uploading image. ");
                return null; }
        }


        public async Task<bool> DeleteImageAsync(string fileId)
        {
            try
            {
                if (string.IsNullOrEmpty(fileId)) return false;

                await _storage.DeleteFile(bucketId: _bucketId, fileId: fileId);
                return true;
            }
            catch { return false; }
        }


    public async Task<ImageUploadResult?> UpdateImageAsync(string oldFileId, IFormFile newFile)
    {
        if (!string.IsNullOrEmpty(oldFileId))
        {
            await DeleteImageAsync(oldFileId);
        }

        return await UploadImageAsync(newFile);
    }
}    