using Cars.Domain;
using Cars.Infrastructure;
using FluentValidation;
using MediatR;

namespace Cars.Application.Cars
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public required Car Car { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Car).SetValidator(new CarValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            //public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            //{
            //    // pobieramy samochód z bazy danych po id
            //    var car = await _context.Cars.FindAsync(request.Car.Id);
            //    if (car == null) return null;

            //    // edytujemy wybrane pola obiektu
            //    // ewentualnie instalujemy automappera
            //    car.Brand = request.Car.Brand ?? car.Brand;
            //    car.Model = request.Car.Model ?? car.Model;
            //    car.DoorsNumber = request.Car.DoorsNumber;
            //    car.LuggageCapacity = request.Car.LuggageCapacity;
            //    car.EngineCapacity = request.Car.EngineCapacity;
            //    car.FuelType = request.Car.FuelType;
            //    car.ProductionDate = request.Car.ProductionDate;
            //    car.CarFuelConsumption = request.Car.CarFuelConsumption;
            //    car.BodyType = request.Car.BodyType;

            //    // zapisujemy zmiany
            //    var result = await _context.SaveChangesAsync() > 0;

            //    if (!result) return Result<Unit>.Failure("Failed to update car.");

            //    return Result<Unit>.Success(Unit.Value);
            //}
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                // Pobierz istniejący rekord z bazy
                var car = await _context.Cars.FindAsync(request.Car.Id);
                if (car == null) return null;

                // Sprawdź, czy dane się różnią
                if (car.Brand == request.Car.Brand &&
                    car.Model == request.Car.Model &&
                    car.DoorsNumber == request.Car.DoorsNumber &&
                    car.LuggageCapacity == request.Car.LuggageCapacity &&
                    car.EngineCapacity == request.Car.EngineCapacity &&
                    car.FuelType == request.Car.FuelType &&
                    car.ProductionDate == request.Car.ProductionDate &&
                    car.CarFuelConsumption == request.Car.CarFuelConsumption &&
                    car.BodyType == request.Car.BodyType)
                {
                    // Dane są takie same, zwracamy sukces bez zapisu do bazy
                    return Result<Unit>.Success(Unit.Value);
                }

                // Aktualizuj dane
                car.Brand = request.Car.Brand ?? car.Brand;
                car.Model = request.Car.Model ?? car.Model;
                car.DoorsNumber = request.Car.DoorsNumber;
                car.LuggageCapacity = request.Car.LuggageCapacity;
                car.EngineCapacity = request.Car.EngineCapacity;
                car.FuelType = request.Car.FuelType;
                car.ProductionDate = request.Car.ProductionDate;
                car.CarFuelConsumption = request.Car.CarFuelConsumption;
                car.BodyType = request.Car.BodyType;

                // Zapisz zmiany
                var result = await _context.SaveChangesAsync(cancellationToken) > 0;

                if (!result) return Result<Unit>.Failure("Failed to update car.");

                return Result<Unit>.Success(Unit.Value);
            }

        }
    }
}
