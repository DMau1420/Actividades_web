import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FotoPrincipalComponent } from './foto-principal.component';

describe('FotoPrincipal', () => {
  let component: FotoPrincipalComponent;
  let fixture: ComponentFixture<FotoPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FotoPrincipalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FotoPrincipalComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
