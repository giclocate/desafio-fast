using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WorkshopApi.Services;

namespace WorkshopApi.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly JwtTokenService _jwtTokenService;

    public AuthController(JwtTokenService jwtTokenService)
    {
        _jwtTokenService = jwtTokenService;
    }

    [AllowAnonymous]
    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Username) || string.IsNullOrWhiteSpace(request.Password))
        {
            return BadRequest(new { message = "Usuário e senha são obrigatórios." });
        }

        if (request.Username == "admin" && request.Password == "admin123")
        {
            var token = _jwtTokenService.GenerateToken(request.Username);
            return Ok(new { token });
        }

        return Unauthorized(new { message = "Credenciais inválidas." });
    }
}

public record LoginRequest(string Username, string Password);
