import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import { CustomForm } from 'src/app/shared/models/custom-form';
import { ValidationMsg } from 'src/app/core/constants/validation-messages';
import { UserDto} from "../../core/models/api/dtos/user/user.dto";

@Injectable()
export class ProfileForm extends CustomForm {
  group!: FormGroup;
  messages: any;

  constructor(matcher: ErrorStateMatcher, private fb: FormBuilder) {
    super(matcher);
    this.setMessagesValidation();
    this.mapToForm();
  }

  mapToForm(user?: Partial<UserDto>) {
    user = user ?? {};
    this.group = this.fb.group({
      id: [user.id],
      firstName: [user.firstName, [Validators.required]],
      lastName: [user.lastName, [Validators.required]],
      email: [{ value: user.username, disabled: true }],
    });
  }

  get documents() {
    return this.group?.get('documents') as FormArray;
  }

  private setMessagesValidation() {
    this.messages = {
      firstName: { ...ValidationMsg.required },
      lastName: { ...ValidationMsg.required },
    };
  }

  formToEntity() {
    const { ...user } = this.group.value;

    return { user } as {
      user: Partial<UserDto>;
    };
  }

}
