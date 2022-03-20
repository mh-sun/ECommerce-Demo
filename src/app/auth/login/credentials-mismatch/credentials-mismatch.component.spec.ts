import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CredentialsMismatchComponent } from './credentials-mismatch.component';

describe('CredentialsMismatchComponent', () => {
  let component: CredentialsMismatchComponent;
  let fixture: ComponentFixture<CredentialsMismatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CredentialsMismatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CredentialsMismatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
