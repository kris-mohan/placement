using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Deltas;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using Placements.DataAccess.Placement.Models;
using Placements.WebApi.Services;

namespace Placements.WebApi.Controllers.PlacementController
{
    [ApiController]
    [Route("odata/CampusCompany")]
    public class OData_CampusCompanyController : ODataController
    {
        private readonly PlacementContext _context;
        public OData_CampusCompanyController(PlacementContext context)
        {
            _context = context;
        }


        [HttpGet, EnableQuery(MaxExpansionDepth = 10)]
        public IActionResult Get()
        {
            return Ok(_context.CampusCompanies);
        }

        [HttpPost]
        public async Task<IActionResult> Post(CampusCompany campusCompany, [FromServices] IEmailCreationService emailCreationService)
        {
            try
            {
                _context.CampusCompanies.Add(campusCompany);
                await _context.SaveChangesAsync();

                var tpc = await _context.Campusregistrations.FindAsync(campusCompany.CampusId);
                var company = await _context.Companydata.FindAsync(campusCompany.CompanyId);

                if (tpc != null && company != null)
                {
                    string subject = "Invitation for Placement Drive Collaboration";

                    string body = $@"
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <style>
                            body {{
                                font-family: Arial, sans-serif;
                                line-height: 1.6;
                                color: #333;
                            }}
                            .container {{
                                width: 100%;
                                max-width: 600px;
                                margin: 0 auto;
                                padding: 20px;
                                border: 1px solid #ddd;
                                border-radius: 8px;
                                background-color: #f9f9f9;
                            }}
                            .header {{
                                background-color: #007BFF;
                                color: #fff;
                                text-align: center;
                                padding: 10px 0;
                                border-radius: 8px 8px 0 0;
                            }}
                            .header h1 {{
                                margin: 0;
                                font-size: 24px;
                            }}
                            .content {{
                                padding: 20px;
                            }}
                            .content p {{
                                margin: 10px 0;
                            }}
                            .cta {{
                                text-align: center;
                                margin: 20px 0;
                            }}
                            .cta a {{
                                display: inline-block;
                                padding: 10px 20px;
                                background-color: #007BFF;
                                color: #fff;
                                text-decoration: none;
                                border-radius: 5px;
                                font-size: 16px;
                            }}
                            .cta a:hover {{
                                background-color: #0056b3;
                            }}
                            .footer {{
                                margin-top: 20px;
                                text-align: center;
                                font-size: 12px;
                                color: #666;
                            }}
                        </style>
                    </head>
                    <body>
                        <div class='container'>
                            <div class='header'>
                                <h1>Invitation for Placement Drive Collaboration</h1>
                            </div>
                            <div class='content'>
                                <p>Dear <strong>{company.ContactPerson ?? company.Name}</strong>,</p>
                                <p>Greetings from <strong>{tpc.CollegeName}</strong>!</p>
                                <p>
                                    We are delighted to invite your esteemed organization to collaborate with us for campus placements.
                                    At <strong>{tpc.CollegeName}</strong>, we pride ourselves on nurturing talented students who excel
                                    in both academics and co-curricular activities.
                                </p>
                                <p>Here are some highlights about our students and college:</p>
                                <ul>
                                    <li>Average Academic Score: <strong>89.5%</strong></li>
                                    <li>Placement Success Rate: <strong>95%</strong></li>
                                    <li>Top Rankings in National-Level Competitions: <strong>1st Place (AI Hackathon), 2nd Place (Coding Championship)</strong></li>
                                    <li>Alumni in Top Companies: <strong>Google, Microsoft, Amazon</strong></li>
                                </ul>
                                <p>
                                    We believe a collaboration with your esteemed organization will provide our students an invaluable opportunity
                                    to learn and grow while also adding value to your workforce.
                                </p>
                                <div class='cta'>
                                    <a href='{company.Url}' target='_blank'>Post Job Openings</a>
                                </div>
                                <p>
                                    For any further inquiries, please feel free to contact our TPC Head:
                                </p>
                                <ul>
                                    <li><strong>Name:</strong> {tpc.PlacementOfficerName}</li>
                                    <li><strong>Email:</strong> {tpc.Email}</li>
                                    <li><strong>Phone:</strong> {tpc.ContactNumber}</li>
                                </ul>
                                <p>
                                    We look forward to collaborating with you and building a strong partnership.
                                </p>
                                <p>
                                    Best Regards,<br>
                                    <strong>{tpc.PlacementOfficerName}</strong><br>
                                    <strong>{tpc.CollegeName}</strong>
                                </p>
                            </div>
                            <div class='footer'>
                                <p>&copy; {DateTime.UtcNow.Year} {tpc.CollegeName}. All rights reserved.</p>
                            </div>
                        </div>
                    </body>
                    </html>";

                    string to = company.Email;
                    string cc = tpc.Email;

                    // Add email to the database or send email
                    await emailCreationService.AddEmailAsync(to, cc, subject, body);
                }

                return Ok(new { success = true, message = "Campus's company Added Successfully" });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Add Campus's compan.", exception = ex });
            }
        }

        [HttpPut]
        public async Task<IActionResult> Put(long key, CampusCompany campusCompany)
        {
            try
            {
                CampusCompany? original = await _context.CampusCompanies.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "Campus's compan Not Found" });
                }

                original.CompanyId = campusCompany.CompanyId;
                original.CampusId = campusCompany.CampusId;

                _context.CampusCompanies.Update(original);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Campus's compan Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Update Campus's compan.", exception = ex });
            }
        }

        [HttpPatch]
        public async Task<IActionResult> Patch(long key, Delta<CampusCompany> delta)
        {
            try
            {
                CampusCompany? original = await _context.CampusCompanies.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "Campus's company Not Found" });
                }

                delta.Patch(original);

                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Campus's compan Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Update Campus's company.", exception = ex });
            }
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(long key)
        {
            try
            {
                CampusCompany campusCompany = await _context.CampusCompanies.FirstOrDefaultAsync(x => x.Id == key);
                if (campusCompany == null)
                {
                    return Ok(new { success = false, message = "Campus's company Not Found" });
                }

                _context.CampusCompanies.Remove(campusCompany);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Campus's compan Deleted Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Delete Campus's company.", exception = ex });
            }
        }

    }
}
