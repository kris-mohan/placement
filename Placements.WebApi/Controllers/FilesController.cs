using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Placements.WebApi.Models;

namespace Placements.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilesController : ControllerBase
    {
        private readonly IWebHostEnvironment _env;

        public FilesController(IWebHostEnvironment env)
        {
            _env = env;
        }

        [HttpPost("UploadFiles")]
        public async Task<IActionResult> UploadFiles(IFormFileCollection files, string folderName)
        {
            var uploadFolder = Path.Combine(_env.WebRootPath, "UploadedFiles");

            if (!Directory.Exists(uploadFolder))
            {
                Directory.CreateDirectory(uploadFolder);
            }

            var uploadedFiles = new List<UploadedFileInfo>();

            foreach (var file in files)
            {
                if (file.Length > 0)
                {
                    var timestamp = DateTime.Now.ToString("yyyyMMdd_HHmmss");
                    var timestampedFileName = $"{timestamp}_{file.FileName}";
                    var filePath = Path.Combine(uploadFolder, timestampedFileName);

                    // Save the file to the server
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                    }

                    // Add file info to the list
                    uploadedFiles.Add(new UploadedFileInfo
                    {
                        FileName = file.FileName,
                        FilePath = Path.Combine("wwwroot", "UploadedFiles",timestampedFileName),
                        FileType = file.ContentType,
                        TimestampedFileName = timestampedFileName
                    });
                }
            }

            return Ok(new { Success = true, Files = uploadedFiles });
        }

        [HttpGet("DownloadFile")]
        public async Task<IActionResult> DownloadFile([FromQuery] string filePath)
        {
            var physicalPath = Path.Combine(_env.WebRootPath, filePath.TrimStart('/'));
            if (!System.IO.File.Exists(filePath))
            {
                return NotFound(new { message = "File not found." });
            }

            var fileName = Path.GetFileName(filePath);

            var memoryStream = new MemoryStream();
            using (var stream = new FileStream(filePath, FileMode.Open, FileAccess.Read))
            {
                await stream.CopyToAsync(memoryStream);
            }
            memoryStream.Position = 0;

            return File(memoryStream, "application/octet-stream", fileName);
        }
    }
}
