
export class FakeValueService {

  constructor() { }

  getValue(){
    return 'fake value'
  }

  setValue(value: string): void{}


  getPromiseValue(){
    return Promise.resolve('fake promise value');
  }
}
