import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintListaComponent } from './sprint-lista.component';

describe('SprintListaComponent', () => {
  let component: SprintListaComponent;
  let fixture: ComponentFixture<SprintListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SprintListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
