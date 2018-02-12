import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RnListaselComponent } from './rn-listasel.component';

describe('RnListaselComponent', () => {
  let component: RnListaselComponent;
  let fixture: ComponentFixture<RnListaselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RnListaselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RnListaselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
