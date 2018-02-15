import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FluxopassoEsbocoComponent } from './fluxopasso-esboco.component';

describe('FluxopassoEsbocoComponent', () => {
  let component: FluxopassoEsbocoComponent;
  let fixture: ComponentFixture<FluxopassoEsbocoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FluxopassoEsbocoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FluxopassoEsbocoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
