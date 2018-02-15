import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FluxopassoDetalhesComponent } from './fluxopasso-detalhes.component';

describe('FluxopassoDetalhesComponent', () => {
  let component: FluxopassoDetalhesComponent;
  let fixture: ComponentFixture<FluxopassoDetalhesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FluxopassoDetalhesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FluxopassoDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
