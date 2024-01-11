import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoiteFormComponent } from './boite-form.component';

describe('BoiteFormComponent', () => {
  let component: BoiteFormComponent;
  let fixture: ComponentFixture<BoiteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoiteFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoiteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
