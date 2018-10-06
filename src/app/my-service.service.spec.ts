import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import {
  HttpModule,
  XHRBackend,
  ResponseOptions,
  Response,
  RequestMethod
} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';

import { MyServiceService } from './my-service.service';

describe('MyServiceService', () => {
  let myService: MyServiceService;
  let backend: MockBackend;

  const mockResponse = {
    'name': 'Biggs Darklighter',
    'height': '183',
    'mass': '84',
    'hair_color': 'black',
    'skin_color': 'light',
    'eye_color': 'brown',
    'birth_year': '24BBY',
    'gender': 'male',
    'homeworld': 'https://swapi.co/api/planets/1/',
    'films': [
        'https://swapi.co/api/films/1/'
    ],
    'species': [
        'https://swapi.co/api/species/1/'
    ],
    'vehicles': [],
    'starships': [
        'https://swapi.co/api/starships/12/'
    ],
    'created': '2014-12-10T15:59:50.509000Z',
    'edited': '2014-12-20T21:17:50.323000Z',
    'url': 'https://swapi.co/api/people/9/'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        {provide: XHRBackend, useClass: MockBackend},
        MyServiceService]
    });

    // Get the MockBackend
    backend = TestBed.get(MockBackend);

    // Returns a service with the MockBackend so we can test with dummy responses
    myService = TestBed.get(MyServiceService);
  });

  it('should be created', inject([MyServiceService], (service: MyServiceService) => {
    expect(service).toBeTruthy();
  }));

  it('should get results', fakeAsync(
    inject([
      XHRBackend,
      MyServiceService
    ], (mockBackend: any, myServiceTested: MyServiceService) => {
      const characterNumber = 9;
      const generatedURL = 'https://swapi.co/api/people/' + characterNumber + '/';

      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          expect(connection.request.method).toBe(RequestMethod.Get);
          expect(connection.request.url).toBe(generatedURL);

          connection.mockRespond(new Response(
            new ResponseOptions({ body: mockResponse })
          ));
        });

        myServiceTested.getCharacter()
        .subscribe(res => {
          expect(res).toEqual(mockResponse);
        });
    })
  ));
});
