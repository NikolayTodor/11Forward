import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProileFollowingComponent } from './proile-following.component';

describe('ProileFollowingComponent', () => {
  let component: ProileFollowingComponent;
  let fixture: ComponentFixture<ProileFollowingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProileFollowingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProileFollowingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
