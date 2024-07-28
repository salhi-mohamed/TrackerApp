import { AbstractControl, ValidatorFn, FormGroup } from '@angular/forms';

export function reminderDateValidator(dueDateKey: string, reminderKey: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const formGroup = control as FormGroup;
    const dueDate = formGroup.controls[dueDateKey];
    const reminder = formGroup.controls[reminderKey];

    if (reminder && dueDate && reminder.value && dueDate.value && new Date(reminder.value) > new Date(dueDate.value)) {
      return { 'reminderAfterDueDate': true };
    }
    return null;
  };
}
