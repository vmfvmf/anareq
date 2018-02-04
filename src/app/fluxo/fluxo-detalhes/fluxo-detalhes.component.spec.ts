import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FluxoDetalhesComponent } from './fluxo-detalhes.component';

describe('FluxoDetalhesComponent', () => {
  let component: FluxoDetalhesComponent;
  let fixture: ComponentFixture<FluxoDetalhesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FluxoDetalhesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FluxoDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
