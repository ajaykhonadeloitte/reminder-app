import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadAccountsComponent } from './upload-accounts.component';

describe('UploadAccountsComponent', () => {
  let component: UploadAccountsComponent;
  let fixture: ComponentFixture<UploadAccountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadAccountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
