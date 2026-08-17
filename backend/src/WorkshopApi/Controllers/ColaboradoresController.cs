using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WorkshopApi.Data;
using WorkshopApi.Models;

namespace WorkshopApi.Controllers;

[ApiController]
[Route("api/colaboradores")]
[Authorize]
public class ColaboradoresController : ControllerBase
{
    private readonly AppDbContext _context;

    public ColaboradoresController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ColaboradorDto>>> GetAll()
    {
        var colaboradores = await _context.Colaboradores
            .Include(c => c.Workshops)
            .AsNoTracking()
            .ToListAsync();

        return Ok(colaboradores.Select(MapToDto));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ColaboradorDto>> GetById(int id)
    {
        var colaborador = await _context.Colaboradores
            .Include(c => c.Workshops)
            .FirstOrDefaultAsync(c => c.Id == id);

        if (colaborador is null)
        {
            return NotFound();
        }

        return Ok(MapToDto(colaborador));
    }

    [HttpPost]
    public async Task<ActionResult<ColaboradorDto>> Create([FromBody] CreateColaboradorRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Nome))
        {
            return BadRequest(new { message = "Nome do colaborador é obrigatório." });
        }

        var colaborador = new Colaborador { Nome = request.Nome.Trim() };
        _context.Colaboradores.Add(colaborador);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = colaborador.Id }, MapToDto(colaborador));
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<ColaboradorDto>> Update(int id, [FromBody] UpdateColaboradorRequest request)
    {
        var colaborador = await _context.Colaboradores.FirstOrDefaultAsync(c => c.Id == id);
        if (colaborador is null)
        {
            return NotFound();
        }

        if (!string.IsNullOrWhiteSpace(request.Nome))
        {
            colaborador.Nome = request.Nome.Trim();
        }

        await _context.SaveChangesAsync();
        return Ok(MapToDto(colaborador));
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var colaborador = await _context.Colaboradores
            .Include(c => c.Workshops)
            .FirstOrDefaultAsync(c => c.Id == id);

        if (colaborador is null)
        {
            return NotFound();
        }

        _context.Colaboradores.Remove(colaborador);
        await _context.SaveChangesAsync();
        return NoContent();
    }

    private static ColaboradorDto MapToDto(Colaborador colaborador) => new()
    {
        Id = colaborador.Id,
        Nome = colaborador.Nome,
        Workshops = colaborador.Workshops.Select(w => new WorkshopResumoDto
        {
            Id = w.Id,
            Nome = w.Nome,
            DataRealizacao = w.DataRealizacao
        }).ToList()
    };
}

public class CreateColaboradorRequest
{
    public string Nome { get; set; } = string.Empty;
}

public class UpdateColaboradorRequest
{
    public string? Nome { get; set; }
}

public class ColaboradorDto
{
    public int Id { get; set; }
    public string Nome { get; set; } = string.Empty;
    public List<WorkshopResumoDto> Workshops { get; set; } = new();
}
