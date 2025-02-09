using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Cars.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")] // endpoint zawsze zaczyna się "api/..."
    public class BaseApiController : ControllerBase 
    {
        private IMediator? _mediator;

        // jeśli mediator jest nullem to przypisz do niego prawą stronę
        protected IMediator Mediator => _mediator ??=
            HttpContext.RequestServices.GetService<IMediator>();
    }
}