import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FluxopassoEsbocoNovoComponent } from './fluxopasso-esboco-novo.component';

describe('FluxopassoEsbocoNovoComponent', () => {
  let component: FluxopassoEsbocoNovoComponent;
  let fixture: ComponentFixture<FluxopassoEsbocoNovoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FluxopassoEsbocoNovoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FluxopassoEsbocoNovoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
