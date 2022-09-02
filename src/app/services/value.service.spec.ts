
import { TestBed } from '@angular/core/testing';
import { ValueService } from './value.service';



describe('ValueService', () => {
  let service: ValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ ValueService ]
    })
    service = TestBed.inject(ValueService);
  });


  it('should be created', ()=> {
    expect(service).toBeTruthy();
  });

  describe('Test for getValue', () => {
    it('should return "my value"', () => {
      expect(service.getValue()).toBe('my value')
    });

  });

  describe('Test for setValue', () => {
    it('should change the value', () => {
      expect(service.getValue()).toBe('my value');
      service.setValue('change')
      expect(service.getValue()).toBe('change');
    });

  });


  describe('Test for getPromiseValue', () => {
    it('should return "Promise value" from promise with then', (doneFn) => {
      service.getPromiseValue()
        .then((value)=> {
          expect(value).toBe('Promise value');
          doneFn();
        })
    });

    it('should return "Promise value" from promise async', async () => {
      const rta = await service.getPromiseValue();
      expect(rta).toBe('Promise value');
    });

  });

  describe('should return "Observable value" from Observable', () => {
    it('should return "Observable value" from promise with subscribe', (doneFn) => {
      service.getObservable()
        .subscribe(value => {
          expect(value).toBe('Observable value');
          doneFn();
        })
    });

  });


});
