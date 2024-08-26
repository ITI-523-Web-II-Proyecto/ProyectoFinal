import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuestosCrudComponent } from './puestos-crud.component';

describe('PuestosCrudComponent', () => {
  let component: PuestosCrudComponent;
  let fixture: ComponentFixture<PuestosCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PuestosCrudComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PuestosCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
