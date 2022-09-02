import { TestBed } from '@angular/core/testing';
import { ProductsService } from './products.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Product, CreateProductDTO, UpdateProductDTO } from '../models/product.model';
import { environment } from 'src/environments/environment';
import { generateManyProducts, generateOneProduct } from '../models/product.mock';

fdescribe('ProductsService', () => {
  let productsService: ProductsService;
  let httpController : HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ ProductsService ]
    })
    productsService = TestBed.inject(ProductsService)
    httpController = TestBed.inject(HttpTestingController)
  });

  afterEach(() => {
    httpController.verify();
  });


  it('should be create', () => {
    expect(productsService).toBeTruthy();
  });

  describe('test for getAllSimple', () => {
    it('should return a product list', (doneFn) => {
      const mockData: Product[] = generateManyProducts(); // Arrange
      productsService.getAllSimple()
        .subscribe((data)=> {
          expect(data.length).toEqual(mockData.length);
          expect(data).toEqual(mockData);
          doneFn();
        })

      // http config
      const url = `${environment.API_URL}/products`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
    });

  });

  describe('test for getAll', () => {
    it('should return a product list', (doneFn) => {
      const mockData: Product[] = generateManyProducts(3); // Arrange
      productsService.getAll()
        .subscribe((data)=> {
          expect(data.length).toEqual(mockData.length);
          doneFn();
        })

      // http config
      const url = `${environment.API_URL}/products`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
    });

    it('should return product list with taxes', (doneFn) => {
      // Arrange
      const mockData: Product[] = [
        {
          ...generateOneProduct(),
          price: 100, // 100 * .19 = 19
        },
        {
          ...generateOneProduct(),
          price: 200, // 100 * .19 = 38
        },
        {
          ...generateOneProduct(),
          price: 0, // 100 * .19 = 0
        },
        {
          ...generateOneProduct(),
          price: -100, // -100 * .19 = 0
        },
      ];

      productsService.getAll()
        .subscribe((data)=> {
          expect(data.length).toEqual(mockData.length);
          expect(data[0].taxes).toEqual(19)
          expect(data[1].taxes).toEqual(38)
          expect(data[2].taxes).toEqual(0)
          expect(data[3].taxes).toEqual(0)
          doneFn();
        })

      // http config
      const url = `${environment.API_URL}/products`;
      const req = httpController.expectOne(url);
      req.flush(mockData);

    });

    it('should send query params with limit 10 and offset 3', (doneFn) => {

      const mockData: Product[] = generateManyProducts(3); // Arrange
      const limit = 10;
      const offset = 3;
      productsService.getAll(limit, offset)
        .subscribe((data)=> {
          expect(data.length).toEqual(mockData.length);
          doneFn();
        })

      // http config
      const url = `${environment.API_URL}/products?limit=${limit}&offset=${offset}`;
      const req = httpController.expectOne(url);
      req.flush(mockData);

      const params = req.request.params;

      expect(params.get('limit')).toEqual(`${limit}`)
      expect(params.get('offset')).toEqual(`${offset}`)

    });


  });


  describe('Test for create', () => {
    it('Should return a new Product', (doneFn) => {
      //Arange
      const mockData = generateOneProduct();
      const dto: CreateProductDTO = {
        categoryId: 12,
        title: 'new Product',
        price: 100,
        images: ['img'],
        description: 'Description'
      }
      //Act
      productsService.create({...dto})
        .subscribe( product => {
          //Assert
          expect(product).toEqual(mockData);
          doneFn();
        })

      const url = `${environment.API_URL}/products`;
      const req = httpController.expectOne(url);
      expect(req.request.body).toEqual(dto);
      expect(req.request.method).toEqual('POST')
      req.flush(mockData);

    });

  });

  describe('Test for update', () => {
    it('Should return a product updated', (doneFn) => {
      // Arange
      const mockData = generateOneProduct();
      const dto: UpdateProductDTO = {
        title: 'Product update'
      }
      const productId = '1';
      // Act
      productsService.update(productId, {...dto})
        .subscribe( product => {
          // Assert
          expect(product).toEqual(mockData);
          doneFn();
        })

        const url = `${environment.API_URL}/products/${productId}`;
        const req = httpController.expectOne(url);
        expect(req.request.body).toEqual(dto);
        expect(req.request.method).toEqual('PUT')
        req.flush(mockData);
    });

  });

  describe('Test for delete', () => {
    it('Should delete a product', (doneFn) => {
      // Arange
      const mockData = true;
      const productId = '1';
      // Act
      productsService.delete(productId)
        .subscribe( product => {
          // Assert
          expect(product).toEqual(mockData);
          doneFn();
        })

        const url = `${environment.API_URL}/products/${productId}`;
        const req = httpController.expectOne(url);
        expect(req.request.method).toEqual('DELETE')
        req.flush(mockData);
    });

  });




});
