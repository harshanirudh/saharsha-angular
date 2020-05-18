import { AbstractControl, ValidatorFn } from '@angular/forms';

export class AutoCompValidator{
  static validator(myArray: any[]): ValidatorFn {

    return (c: AbstractControl): { [key: string]: boolean } | null => {
      let selectboxValue = c.value;
      let pickedOrNot = myArray.filter(alias => alias === selectboxValue);

      if (pickedOrNot.length > 0) {
        // everything's fine. return no error. therefore it's null.
        return null;

      } else {
        //there's no matching selectboxvalue selected. so return match error.
        return { match: true };
      }
    }
  }
}
/* Custom validator with parameters returns a validator function */
/* For reference :-  https://dzone.com/articles/how-to-create-custom-validators-in-angular  */
