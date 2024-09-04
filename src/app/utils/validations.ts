import { AbstractControl, ValidatorFn } from '@angular/forms';

export function noNumbersValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    const hasNumber = /\d/.test(value);
    return hasNumber ? { noNumbers: { value: control.value } } : null;
  };
}

export function dateRangeValidator(): ValidatorFn {
  return (formGroup: AbstractControl): { [key: string]: any } | null => {
    const start = formGroup.get('batchEnrollmentDateStart')?.value;
    const end = formGroup.get('batchEnrollmentDateEnd')?.value;

    return start && end && new Date(start) >= new Date(end)
      ? { dateRange: { value: { start, end } } }
      : null;
  };
}
