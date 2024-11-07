namespace Placements.WebApi.Models
{
    public class UploadedFileInfo
    {
        public string FileName { get; set; }
        public string FilePath { get; set; }
        public string FileType { get; set; }
        public string TimestampedFileName { get; set; }
        public string ErrorMessage { get; set; }
    }

}
