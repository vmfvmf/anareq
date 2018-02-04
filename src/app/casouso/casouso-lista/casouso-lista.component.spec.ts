import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasousoListaComponent } from './casouso-lista.component';

describe('CasousoListaComponent', () => {
  let component: CasousoListaComponent;
  let fixture: ComponentFixture<CasousoListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasousoListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasousoListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
