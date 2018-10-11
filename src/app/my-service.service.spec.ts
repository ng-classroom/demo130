import { TestBed, inject, async } from '@angular/core/testing';
import {MockBackend} from '@angular/http/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import { MyServiceService } from './my-service.service';

describe('MyServiceService', () => {

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
      imports: [HttpClientTestingModule],
      providers: [MyServiceService]
    });
  });

  describe('get data', () => {
    it('should get results',
    inject([HttpTestingController, MyServiceService], (httpMock: HttpTestingController, myServiceTested: MyServiceService) => {
      const swapiUrl = 'https://swapi.co/api/people/9/';
      myServiceTested.getCharacter()
      .subscribe(
        (res) => {
          expect(res).toEqual(mockResponse);
        }
      );
      const req = httpMock.expectOne(swapiUrl);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    })
  );
  });
});
