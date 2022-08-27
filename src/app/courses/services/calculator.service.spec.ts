import { CalculatorService } from "./calculator.service";
import { LoggerService } from "./logger.service";

describe('Calculatorservice', () => {

    // com spyOn

    it('should add two numbers', () => {
        const logger = jasmine.createSpyObj('LoggerService', ["log"]);

        // quando precisar retornar valores de um metodo fake, do it:
        // logger.log.and.returnValue();

        const calculator = new CalculatorService(logger);
        const result = calculator.add(2, 2);
        expect(result).toBe(4);

    });

    it('should subtract two numbers', () => {
        const calculator = new CalculatorService(new LoggerService());
        const result = calculator.subtract(2, 2);
        expect(result).toBe(0, "resultado inesperado de subtração");

    });

    // Básico

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