﻿using Cars.Domain;
using Cars.Infrastructure;
using FluentValidation;
using MediatR;

namespace Cars.Application.Cars
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Car Car { get; set; }
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

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                // na tym etapie dodajemy auto tylko do pamięci
                // jeszcze nie do bazy
                _context.Cars.Add(request.Car);

                // teraz następuje zapis w bazie
                // SaveChangesAsync zwraca liczbę uaktualnionych wierszy w bazie danych
                var result = await _context.SaveChangesAsync() > 0;

                // tak naprawdę nie zwracamy konkretnej wartości, 
                // tylko informujemy, że proces obsługi się zakończył
                // Unit jest ''nothing object''
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
