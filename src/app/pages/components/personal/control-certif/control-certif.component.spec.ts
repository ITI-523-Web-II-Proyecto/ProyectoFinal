import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlCertifComponent } from './control-certif.component';

describe('ControlCertifComponent', () => {
  let component: ControlCertifComponent;
  let fixture: ComponentFixture<ControlCertifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlCertifComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ControlCertifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
