import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouselIstComponent } from './warehousel-ist.component';

describe('WarehouselIstComponent', () => {
  let component: WarehouselIstComponent;
  let fixture: ComponentFixture<WarehouselIstComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WarehouselIstComponent]
    });
    fixture = TestBed.createComponent(WarehouselIstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
