import { Calculator } from './calculator';

describe('Test for calculator', () => {

  describe('Test for #multiply', () => {

    it('#multiply should return a nine', () => {
      // Arrange
      const calculator = new Calculator();
      // Act
      const rta = calculator.multiply(3,3);
      // Assert
      expect(rta).toEqual(9);

    });

    it('#multiply should return a four', () => {
      // Arrange
      const calculator = new Calculator();
      // Act
      const rta = calculator.multiply(2,2);
      // Assert
      expect(rta).toEqual(4);

    });

  });

  describe('Test for #divide', () => {

    it('#divide should return a two', () => {
      // Arrange
      const calculator = new Calculator();
      // Act
      const rta = calculator.divide(4,2);
      // Assert
      expect(rta).toEqual(2);

    });

    it('#divide should return a three', () => {
      // Arrange
      const calculator = new Calculator();
      // Act and Assert
      expect(calculator.divide(12,4)).toEqual(3);

    });

    it('#divide should return null', () => {
      // Arrange
      const calculator = new Calculator();
      // Act and Assert
      expect(calculator.divide(12,0)).toBe(null);

    });

    it('test matchers', () => {
      const name = 'Manuel';
      let name2;

      expect(name).toBeDefined();
      expect(name2).toBeUndefined();

      expect(1 + 3 === 4).toBeTruthy();
      expect(1 + 1 === 3).toBeFalsy();

      expect(5).toBeLessThan(10);
      expect(20).toBeGreaterThan(1);

      expect('123456').toMatch(/123/);
      expect(['apples', 'oranges', 'pears']).toContain('oranges');
    });

  });


});
