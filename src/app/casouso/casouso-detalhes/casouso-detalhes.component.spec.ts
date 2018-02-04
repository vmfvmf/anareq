import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasousoDetalhesComponent } from './casouso-detalhes.component';

describe('CasousoDetalhesComponent', () => {
  let component: CasousoDetalhesComponent;
  let fixture: ComponentFixture<CasousoDetalhesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasousoDetalhesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasousoDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
