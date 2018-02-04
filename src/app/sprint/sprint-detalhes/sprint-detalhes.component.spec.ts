import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintDetalhesComponent } from './sprint-detalhes.component';

describe('SprintDetalhesComponent', () => {
  let component: SprintDetalhesComponent;
  let fixture: ComponentFixture<SprintDetalhesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SprintDetalhesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
