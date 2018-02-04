import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FluxoListaComponent } from './fluxo-lista.component';

describe('FluxoListaComponent', () => {
  let component: FluxoListaComponent;
  let fixture: ComponentFixture<FluxoListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FluxoListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FluxoListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
