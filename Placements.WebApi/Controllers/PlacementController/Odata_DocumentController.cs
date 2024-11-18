using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Deltas;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using Placements.DataAccess.Placement.Models;

namespace Placements.WebApi.Controllers.PlacementController
{
    [Route("odata/Document")]
    [ApiController]
    public class Odata_DocumentController : ODataController
    {
        private readonly PlacementContext _context;
        public Odata_DocumentController(PlacementContext context)
        {
            _context = context;
        }

        [HttpGet, EnableQuery(MaxExpansionDepth = 10)]
        public IActionResult Get()
        {
            return Ok(_context.Documents);
        }

        [HttpPost]
        public async Task<IActionResult> Post(Document document)
        {
            try
            {
                _context.Documents.Add(document);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Document Added Successfully" });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Add Document.", exception = ex });
            }
        }

        [HttpPut]
        public async Task<IActionResult> Put(long key, Document document)
        {
            try
            {
                Document? original = await _context.Documents.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "Batch Not Found" });
                }


                _context.Documents.Update(document);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Document Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Update Document.", exception = ex });
            }
        }

        [HttpPatch]
        public async Task<IActionResult> Patch(long key, Delta<Document> delta)
        {
            try
            {
                Document? original = await _context.Documents.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "Document Not Found" });
                }

                delta.Patch(original);

                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Document Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Update Document.", exception = ex });
            }
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(long key)
        {
            try
            {
                Document document = await _context.Documents.FirstOrDefaultAsync(x => x.Id == key);
                if (document == null)
                {
                    return Ok(new { success = false, message = "Document Not Found" });
                }

                _context.Documents.Remove(document);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Document Deleted Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Delete Document.", exception = ex });
            }
        }

    }
}
