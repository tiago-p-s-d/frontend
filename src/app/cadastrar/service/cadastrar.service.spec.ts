import { TestBed } from '@angular/core/testing';

import { CadastrarService } from './cadastrar.service';

describe('CadastrarService', () => {
  let service: CadastrarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CadastrarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
