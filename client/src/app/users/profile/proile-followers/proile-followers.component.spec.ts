import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProileFollowersComponent } from './proile-followers.component';

describe('ProileFollowersComponent', () => {
  let component: ProileFollowersComponent;
  let fixture: ComponentFixture<ProileFollowersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProileFollowersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProileFollowersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
