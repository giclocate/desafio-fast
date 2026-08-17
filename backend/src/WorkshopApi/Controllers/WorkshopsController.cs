using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WorkshopApi.Data;
using WorkshopApi.Models;

namespace WorkshopApi.Controllers;

[ApiController]
[Route("api/workshops")]
[Authorize]
public class WorkshopsController : ControllerBase
{
    private readonly AppDbContext _context;

    public WorkshopsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<WorkshopDto>>> GetAll()
    {
        var workshops = await _context.Workshops
            .Include(w => w.Colaboradores)
            .AsNoTracking()
            .ToListAsync();

        return Ok(workshops.Select(MapToDto));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<WorkshopDto>> GetById(int id)
    {
        var workshop = await _context.Workshops
            .Include(w => w.Colaboradores)
            .FirstOrDefaultAsync(w => w.Id == id);

        if (workshop is null)
        {
            return NotFound();
        }

        return Ok(MapToDto(workshop));
    }

    [HttpPost]
    public async Task<ActionResult<WorkshopDto>> Create([FromBody] CreateWorkshopRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Nome))
        {
            return BadRequest(new { message = "Nome do workshop é obrigatório." });
        }

        if (request.DataRealizacao == default)
        {
            return BadRequest(new { message = "Data de realização é obrigatória." });
        }

        var workshop = new Workshop
        {
            Nome = request.Nome.Trim(),
            DataRealizacao = request.DataRealizacao,
            Descricao = request.Descricao ?? string.Empty
        };

        _context.Workshops.Add(workshop);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = workshop.Id }, MapToDto(workshop));
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<WorkshopDto>> Update(int id, [FromBody] UpdateWorkshopRequest request)
    {
        var workshop = await _context.Workshops.FirstOrDefaultAsync(w => w.Id == id);
        if (workshop is null)
        {
            return NotFound();
        }

        if (!string.IsNullOrWhiteSpace(request.Nome))
        {
            workshop.Nome = request.Nome.Trim();
        }

        if (request.DataRealizacao.HasValue)
        {
            workshop.DataRealizacao = request.DataRealizacao.Value;
        }

        if (request.Descricao is not null)
        {
            workshop.Descricao = request.Descricao;
        }

        await _context.SaveChangesAsync();
        return Ok(MapToDto(workshop));
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var workshop = await _context.Workshops
            .Include(w => w.Colaboradores)
            .FirstOrDefaultAsync(w => w.Id == id);

        if (workshop is null)
        {
            return NotFound();
        }

        _context.Workshops.Remove(workshop);
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpGet("{id}/colaboradores")]
    public async Task<ActionResult<IEnumerable<ColaboradorResumoDto>>> GetColaboradores(int id)
    {
        var workshop = await _context.Workshops
            .Include(w => w.Colaboradores)
            .FirstOrDefaultAsync(w => w.Id == id);

        if (workshop is null)
        {
            return NotFound();
        }

        return Ok(workshop.Colaboradores.Select(c => new ColaboradorResumoDto
        {
            Id = c.Id,
            Nome = c.Nome
        }));
    }

    [HttpPost("{id}/presenca")]
    public async Task<ActionResult<WorkshopDto>> AddPresenca(int id, [FromBody] AddPresencaRequest request)
    {
        var workshop = await _context.Workshops
            .Include(w => w.Colaboradores)
            .FirstOrDefaultAsync(w => w.Id == id);

        if (workshop is null)
        {
            return NotFound();
        }

        var colaborador = await _context.Colaboradores.FindAsync(request.ColaboradorId);
        if (colaborador is null)
        {
            return NotFound(new { message = "Colaborador informado não existe." });
        }

        if (!workshop.Colaboradores.Any(c => c.Id == colaborador.Id))
        {
            workshop.Colaboradores.Add(colaborador);
            await _context.SaveChangesAsync();
        }

        return Ok(MapToDto(workshop));
    }

    [HttpDelete("{id}/presenca/{colaboradorId}")]
    public async Task<IActionResult> RemovePresenca(int id, int colaboradorId)
    {
        var workshop = await _context.Workshops
            .Include(w => w.Colaboradores)
            .FirstOrDefaultAsync(w => w.Id == id);

        if (workshop is null)
        {
            return NotFound();
        }

        var colaborador = workshop.Colaboradores.FirstOrDefault(c => c.Id == colaboradorId);
        if (colaborador is null)
        {
            return NotFound();
        }

        workshop.Colaboradores.Remove(colaborador);
        await _context.SaveChangesAsync();
        return NoContent();
    }

    private static WorkshopDto MapToDto(Workshop workshop) => new()
    {
        Id = workshop.Id,
        Nome = workshop.Nome,
        DataRealizacao = workshop.DataRealizacao,
        Descricao = workshop.Descricao,
        Colaboradores = workshop.Colaboradores.Select(c => new ColaboradorResumoDto
        {
            Id = c.Id,
            Nome = c.Nome
        }).ToList()
    };
}

public class CreateWorkshopRequest
{
    public string Nome { get; set; } = string.Empty;
    public DateTime DataRealizacao { get; set; }
    public string? Descricao { get; set; }
}

public class UpdateWorkshopRequest
{
    public string? Nome { get; set; }
    public DateTime? DataRealizacao { get; set; }
    public string? Descricao { get; set; }
}

public class AddPresencaRequest
{
    public int ColaboradorId { get; set; }
}

public class WorkshopDto
{
    public int Id { get; set; }
    public string Nome { get; set; } = string.Empty;
    public DateTime DataRealizacao { get; set; }
    public string Descricao { get; set; } = string.Empty;
    public List<ColaboradorResumoDto> Colaboradores { get; set; } = new();
}

public class WorkshopResumoDto
{
    public int Id { get; set; }
    public string Nome { get; set; } = string.Empty;
    public DateTime DataRealizacao { get; set; }
}

public class ColaboradorResumoDto
{
    public int Id { get; set; }
    public string Nome { get; set; } = string.Empty;
}
