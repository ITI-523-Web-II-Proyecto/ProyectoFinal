import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfertarEmpComponent } from './ofertar-emp.component';

describe('OfertarEmpComponent', () => {
  let component: OfertarEmpComponent;
  let fixture: ComponentFixture<OfertarEmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfertarEmpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OfertarEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
