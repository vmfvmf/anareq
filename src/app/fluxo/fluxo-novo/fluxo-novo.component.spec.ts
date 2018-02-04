import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FluxoNovoComponent } from './fluxo-novo.component';

describe('FluxoNovoComponent', () => {
  let component: FluxoNovoComponent;
  let fixture: ComponentFixture<FluxoNovoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FluxoNovoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FluxoNovoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
