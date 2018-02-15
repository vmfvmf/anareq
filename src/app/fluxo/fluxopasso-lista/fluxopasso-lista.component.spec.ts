import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FluxopassoListaComponent } from './fluxopasso-lista.component';

describe('PassoListaComponent', () => {
  let component: FluxopassoListaComponent;
  let fixture: ComponentFixture<FluxopassoListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FluxopassoListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FluxopassoListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
