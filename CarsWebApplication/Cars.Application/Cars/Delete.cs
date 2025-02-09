using Cars.Infrastructure;
using MediatR;

namespace Cars.Application.Cars
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            // usuwamy po Id
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var car = await _context.Cars.FindAsync(request.Id);

                // usuwamy tylko z ,,pamięci"
                _context.Remove(car);

                // zapisujemy zmiany w bazie danych
                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to delete the car");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
