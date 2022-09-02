
import { TestBed } from '@angular/core/testing';

import { MasterService } from './master.service';
import { ValueService } from './value.service';

describe('MasterService', () => {

  let masterService: MasterService;
  let valueServiceSpy: jasmine.SpyObj<ValueService>

  beforeEach(() => {

    const spy = jasmine.createSpyObj('ValueService', ['getValue'])

    TestBed.configureTestingModule({
      providers: [
        MasterService,
        { provide: ValueService, useValue: spy }
      ]
    })
    masterService = TestBed.inject(MasterService)
    valueServiceSpy = TestBed.inject(ValueService) as jasmine.SpyObj<ValueService>
  });

  it('should be create', () => {
    expect(masterService).toBeTruthy();
  });

  /* it('should return "my value" from real service', () => {
    const valueService = new ValueService();
    const masterService = new MasterService(valueService);
    expect(masterService.getValue()).toBe('my value');
  });

  it('should return "other value" from fake service', () => {
    const fakeValue = new FakeValueService();
    const masterService = new MasterService(fakeValue as unknown as ValueService);
    expect(masterService.getValue()).toBe('fake value');
  });

  it('should return "other value" from fake object', () => {
    const fake = { getValue: () => 'fake from obj' }
    const masterService = new MasterService(fake as ValueService);
    expect(masterService.getValue()).toBe('fake from obj');
  }); */

  it('should call to getValue from ValueService', () => {
    valueServiceSpy.getValue.and.returnValue('fake value');
    expect(masterService.getValue()).toBe('fake value'); // ok
    expect(valueServiceSpy.getValue).toHaveBeenCalled();
    expect(valueServiceSpy.getValue).toHaveBeenCalledTimes(1);
  });


});
