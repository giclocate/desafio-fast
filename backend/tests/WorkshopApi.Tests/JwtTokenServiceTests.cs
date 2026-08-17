using Microsoft.Extensions.Configuration;
using WorkshopApi.Services;

namespace WorkshopApi.Tests;

public class JwtTokenServiceTests
{
    [Fact]
    public void GenerateToken_ShouldReturnNonEmptyJwtToken()
    {
        var configuration = new ConfigurationBuilder()
            .AddInMemoryCollection(new Dictionary<string, string?>
            {
                ["Jwt:Key"] = "desafio-fast-dev-key-1234567890",
                ["Jwt:Issuer"] = "WorkshopApi",
                ["Jwt:Audience"] = "WorkshopApiUsers"
            })
            .Build();

        var service = new JwtTokenService(configuration);

        var token = service.GenerateToken("admin");

        Assert.False(string.IsNullOrWhiteSpace(token));
        Assert.Contains(".", token);
    }
}
