import { TestBed } from "@angular/core/testing";
import { CalculatorService } from "./calculator.service";
import { LoggerService } from "./logger.service";

describe('Calculatorservice', () => {

    let calculator: CalculatorService;
    let loggerSpy: any;

    beforeEach(() => {
        loggerSpy = jasmine.createSpyObj('LoggerService', ["log"]);
        
        TestBed.configureTestingModule({
            providers: [
                CalculatorService,
                { provide: LoggerService, useValue: loggerSpy }
            ],
        })
        calculator = TestBed.inject(CalculatorService);
    })

    // com spyOn

    it('should add two numbers', () => {
        loggerSpy = jasmine.createSpyObj('LoggerService', ["log"]);

        // quando precisar retornar valores de um metodo fake, do it:
        // logger.log.and.returnValue();

        const result = calculator.add(2, 2);
        expect(result).toBe(4);

    });

    it('should subtract two numbers', () => {
        const calculator = new CalculatorService(new LoggerService());
        const result = calculator.subtract(2, 2);
        expect(result).toBe(0, "resultado inesperado de subtração");

    });


    // ==========================================================================
    //                              SpyOn
    // ==========================================================================


    // it('should add two numbers', () => {
    //     const logger = new LoggerService(); // Here we create a new instance of logger service
    //     spyOn(logger, 'log');
    //     const calculator = new CalculatorService(logger);
    //     const result = calculator.add(2, 2);
    //     expect(result).toBe(4); // First exepct
        
    //     // Validate how many times the logger is being called
    //     expect(logger.log).toHaveBeenCalledTimes(1); // Check if the function is being called only once
    // });

    // it('should add two numbers', () => {
    //     // Implementing Jasmine Create Spy Object
    //     const logger = jasmine.createSpyObj('LoggerService', ['log']);
        
    //     const calculator = new CalculatorService(logger);
    //     const result = calculator.add(2, 2);
    //     expect(result).toBe(4); // First exepct
        
    //     // Validate how many times the logger is being called
    //     // Check if the function is being called only once
    //     expect(logger.log).toHaveBeenCalledTimes(1);
    // });


    // ==========================================================================
    //                              Básico
    // ==========================================================================

    // it('should add two numbers', () => {
    //     const calculator = new CalculatorService(new LoggerService());
    //     const result = calculator.add(2, 2);
    //     expect(result).toBe(4);

    // });

    // it('should subtract two numbers', () => {
    //     const calculator = new CalculatorService(new LoggerService());
    //     const result = calculator.subtract(2, 2);
    //     expect(result).toBe(0, "resultado inesperado de subtração");

    // });

})

// https://baldur.gitbook.io/angular/angular-test/testing