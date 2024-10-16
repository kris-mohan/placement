using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OfficeOpenXml;
using Placements.DataAccess.Placement.Models;

namespace Placements.WebApi.Controllers
{
    [Route("api/common")]
    [ApiController]
    public class CommonController : ControllerBase
    {
        private readonly PlacementContext _context;

        public CommonController(PlacementContext context)
        {
            _context = context;
        }

        #region download student template

        [HttpGet("download-students-template")]
        public async Task<IActionResult> DownloadTemplate()
        {
            return await GenerateStudentTemplate();
        }

        private async Task<FileContentResult> GenerateStudentTemplate()
        {
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

            // Fetch Batch, Stream, and Course data
            var batches = await _context.Batches.Select(b => new { b.Id, b.Name }).ToListAsync();
            var streams = await _context.Streams.Select(s => new { s.Id, s.Name }).ToListAsync();
            var courses = await _context.Courses.Select(c => new { c.Id, c.Name }).ToListAsync();

            // Initialize the Excel package
            using (var package = new ExcelPackage())
            {
                // Add a worksheet
                var worksheet = package.Workbook.Worksheets.Add("Student Template");

                // Define column headers
                worksheet.Cells[1, 1].Value = "First Name";
                worksheet.Cells[1, 2].Value = "Last Name";
                worksheet.Cells[1, 3].Value = "Batch";
                worksheet.Cells[1, 4].Value = "Stream";
                worksheet.Cells[1, 5].Value = "Course";
                worksheet.Cells[1, 6].Value = "Aadhar Card Number";
                worksheet.Cells[1, 7].Value = "Permanent Address";
                worksheet.Cells[1, 8].Value = "Current Address";
                worksheet.Cells[1, 9].Value = "Email";
                worksheet.Cells[1, 10].Value = "Phone Number";
                worksheet.Cells[1, 11].Value = "Parent Name";
                worksheet.Cells[1, 12].Value = "Parent Phone Number";
                worksheet.Cells[1, 13].Value = "Date Of Birth";
                worksheet.Cells[1, 14].Value = "Roll No.";

                // Apply word wrapping to the entire sheet
                worksheet.Cells.Style.WrapText = true;

                // AutoFit columns to fit the content
                // Apply the max column width to all columns
                for (int col = 1; col <= 14; col++)
                {
                    worksheet.Column(col).Width = 30;
                }

                // Set dropdown lists for Batch, Stream, and Course columns
                SetDropdown(worksheet, 3, batches.Select(b => b.Name).ToArray());
                SetDropdown(worksheet, 4, streams.Select(s => s.Name).ToArray());
                SetDropdown(worksheet, 5, courses.Select(c => c.Name).ToArray());

                // Add custom date validation for Date Of Birth column (Column 13)
                SetDateValidation(worksheet, 13);

                // Prepare the Excel file
                var fileName = "StudentTemplate.xlsx";
                var fileContents = package.GetAsByteArray();

                // Return the file as a response
                return File(fileContents, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", fileName);
            }
        }

        private void SetDropdown(ExcelWorksheet worksheet, int column, string[] options)
        {
            var range = worksheet.Cells[2, column, 100, column];  // Apply dropdown for 100 rows
            var validation = worksheet.DataValidations.AddListValidation(range.Address);
            foreach (var option in options)
            {
                validation.Formula.Values.Add(option);
            }
        }

        private void SetDateValidation(ExcelWorksheet worksheet, int column)
        {
            // Add a note to instruct the user on date format
            for (int row = 2; row <= 100; row++)
            {
                var cell = worksheet.Cells[row, column];
                cell.AddComment("Please enter the date in dd-mm-yyyy format", "System");
            }

            // Apply custom validation for dates (100 rows)
            var range = worksheet.Cells[2, column, 100, column];
            var validation = worksheet.DataValidations.AddCustomValidation(range.Address);
            validation.Formula.ExcelFormula = "AND(ISNUMBER(" + range.Start.Address + "))";
            validation.ShowErrorMessage = true;
            validation.ErrorTitle = "Invalid Date";
            validation.Error = "Please enter a valid date in dd-mm-yyyy format.";
        }

        #endregion

        #region upload students

        [HttpPost("upload-students")]
        public async Task<IActionResult> UploadStudents(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }

            try
            {
                var students = new List<Tblstudent>();
                var errors = new List<string>(); // List to capture errors

                using (var stream = new MemoryStream())
                {
                    await file.CopyToAsync(stream);

                    ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

                    using (var package = new ExcelPackage(stream))
                    {
                        var worksheet = package.Workbook.Worksheets[0]; // Assuming data is in the first worksheet

                        // Start reading from the second row (first row is header)
                        for (int row = 2; row <= worksheet.Dimension.End.Row; row++)
                        {
                            // Read data from the Excel row
                            var firstName = worksheet.Cells[row, 1].Text;
                            var lastName = worksheet.Cells[row, 2].Text;
                            var batchName = worksheet.Cells[row, 3].Text;
                            var streamName = worksheet.Cells[row, 4].Text;
                            var courseName = worksheet.Cells[row, 5].Text;
                            var aadharCardNumber = worksheet.Cells[row, 6].Text;
                            var permanentAddress = worksheet.Cells[row, 7].Text;
                            var currentAddress = worksheet.Cells[row, 8].Text;
                            var email = worksheet.Cells[row, 9].Text;
                            var phoneNumber = worksheet.Cells[row, 10].Text;
                            var parentName = worksheet.Cells[row, 11].Text;
                            var parentPhoneNumber = worksheet.Cells[row, 12].Text;
                            var dobString = worksheet.Cells[row, 13].Text;
                            var rollNo = worksheet.Cells[row, 14].Text;

                            // Check if the entire row is empty
                            if (string.IsNullOrWhiteSpace(firstName) &&
                                string.IsNullOrWhiteSpace(lastName) &&
                                string.IsNullOrWhiteSpace(batchName) &&
                                string.IsNullOrWhiteSpace(streamName) &&
                                string.IsNullOrWhiteSpace(courseName) &&
                                string.IsNullOrWhiteSpace(aadharCardNumber) &&
                                string.IsNullOrWhiteSpace(email) &&
                                string.IsNullOrWhiteSpace(rollNo))
                            {
                                continue; // Skip this row if it's completely empty
                            }

                            // Validate required fields
                            var missingFields = new List<string>();

                            if (string.IsNullOrWhiteSpace(firstName))
                                missingFields.Add("First Name");
                            if (string.IsNullOrWhiteSpace(lastName))
                                missingFields.Add("Last Name");
                            if (string.IsNullOrWhiteSpace(batchName))
                                missingFields.Add("Batch");
                            if (string.IsNullOrWhiteSpace(streamName))
                                missingFields.Add("Stream");
                            if (string.IsNullOrWhiteSpace(courseName))
                                missingFields.Add("Course");
                            if (string.IsNullOrWhiteSpace(email))
                                missingFields.Add("Email");
                            if (string.IsNullOrWhiteSpace(aadharCardNumber))
                                missingFields.Add("Aadhar Card Number");
                            if (string.IsNullOrWhiteSpace(rollNo))
                                missingFields.Add("Roll No");

                            // If there are any missing fields, add an error message
                            if (missingFields.Any())
                            {
                                errors.Add($"Row {row}: Missing details - {string.Join(", ", missingFields)}.");
                                continue; // Skip this row
                            }

                            // Create new student object
                            var student = new Tblstudent
                            {
                                FirstName = firstName,
                                LastName = lastName,
                                BatchId = GetBatchId(batchName),
                                AadharCardNumber = aadharCardNumber,
                                PermanentAddress = permanentAddress,
                                CurrentAddress = currentAddress,
                                Email = email,
                                PhoneNumber = phoneNumber,
                                ParentName = parentName,
                                ParentPhoneNumber = parentPhoneNumber,
                                DateOfBirth = ParseDate(dobString),
                                RollNo = rollNo
                            };

                            // Set Course and Stream details
                            student.Studentacademics = new List<Studentacademic>
                    {
                        new Studentacademic
                        {
                            CourseId = GetCourseId(courseName),
                            StreamId = GetStreamId(streamName),
                            Cgpa = null // Set this if needed
                        }
                    };

                            students.Add(student);
                        }
                    }
                }

                // Check if there are errors
                if (errors.Any())
                {
                    return BadRequest(new { message = "Some rows have errors.", errors });
                }

                // Add students to the context and save changes
                await _context.Tblstudents.AddRangeAsync(students);
                await _context.SaveChangesAsync();

                return Ok(new { message = $"{students.Count} students uploaded successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        private long? GetBatchId(string batchName)
        {
            var batch = _context.Batches.FirstOrDefault(b => b.Name == batchName);
            return batch?.Id;
        }

        private long? GetCourseId(string courseName)
        {
            var course = _context.Courses.FirstOrDefault(c => c.Name == courseName);
            return course?.Id;
        }

        private long? GetStreamId(string streamName)
        {
            var stream = _context.Streams.FirstOrDefault(s => s.Name == streamName);
            return stream?.Id;
        }

        private DateTime? ParseDate(string dateString)
        {
            if (DateTime.TryParseExact(dateString, "dd-MM-yyyy", null, System.Globalization.DateTimeStyles.None, out var date))
            {
                return date;
            }
            return null; // or throw an exception based on your requirement
        }

        #endregion
    }
}
