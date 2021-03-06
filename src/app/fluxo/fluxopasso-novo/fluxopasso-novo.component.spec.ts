import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FluxopassoNovoComponent } from './fluxopasso-novo.component';

describe('FluxopassoNovoComponent', () => {
  let component: FluxopassoNovoComponent;
  let fixture: ComponentFixture<FluxopassoNovoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FluxopassoNovoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FluxopassoNovoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
