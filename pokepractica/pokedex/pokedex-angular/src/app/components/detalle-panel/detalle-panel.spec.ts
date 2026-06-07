import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallePanelComponent } from './detalle-panel.component';

describe('DetallePanelComponent', () => {
  let component: DetallePanelComponent;
  let fixture: ComponentFixture<DetallePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallePanelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DetallePanelComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
