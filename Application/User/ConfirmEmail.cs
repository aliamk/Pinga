using System.Text;
using System.Threading;
using System.Threading.Tasks;               // Encoding
using Domain;                               // AppUser
using FluentValidation;                     // AbstractValidator
using MediatR;                              // IRequest
using Microsoft.AspNetCore.Identity;        // IdentityResult
using Microsoft.AspNetCore.WebUtilities;    // WebEncoders

namespace Application.User
{
    public class ConfirmEmail
    {
        public class Command : IRequest<IdentityResult>
        {
            // Send email and token from body of request received from user clicking the confirmation email link
            public string Token { get; set; }
            public string Email { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Email).NotEmpty();
                RuleFor(x => x.Token).NotEmpty();
            }
        }
        public class Handler : IRequestHandler<Command, IdentityResult>
        {
            private readonly UserManager<AppUser> _userManager;
            public Handler(UserManager<AppUser> userManager)
            {
                _userManager = userManager;
            }

            public async Task<IdentityResult> Handle(Command request, CancellationToken cancellationToken)
            {
                // Get the user from the userManager
                var user = await _userManager.FindByEmailAsync(request.Email);

                // Decode the token (reverse the encoding done in Register.cs)
                var decodedTokenBytes = WebEncoders.Base64UrlDecode(request.Token);
                var decodedToken = Encoding.UTF8.GetString(decodedTokenBytes);

                return await _userManager.ConfirmEmailAsync(user, decodedToken);
            }
        }
    }
}