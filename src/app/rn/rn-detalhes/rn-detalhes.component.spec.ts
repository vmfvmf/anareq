import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RnDetalhesComponent } from './rn-detalhes.component';

describe('RnDetalhesComponent', () => {
  let component: RnDetalhesComponent;
  let fixture: ComponentFixture<RnDetalhesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RnDetalhesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RnDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
