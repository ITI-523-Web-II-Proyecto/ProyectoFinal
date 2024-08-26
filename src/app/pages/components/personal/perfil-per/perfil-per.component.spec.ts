import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilPerComponent } from './perfil-per.component';

describe('PerfilPerComponent', () => {
  let component: PerfilPerComponent;
  let fixture: ComponentFixture<PerfilPerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilPerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PerfilPerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
