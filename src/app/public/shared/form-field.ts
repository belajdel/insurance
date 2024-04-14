import {ErrorMsgs} from "./error-msgs";
import {Select} from "./select";


type SelectFormField={
  type: 'select',
  label: string,
  readonly:boolean,
  hidden:boolean,
  formControlName: string,
  preffix_icon?:string,
  suffix_icon?:string,
  //errorsMessages?:ErrorMsgs
  select:Select
}

type PasswordFormField={
  type: 'password',
  label: string,
  readonly:boolean,
  hidden:boolean,
  formControlName: string,
  preffix_icon?:string,
  suffix_icon:string,
  showPassword:()=>void,
  errorsMessages?:ErrorMsgs
}

type TextorNumberFormField={
  type: 'text' | 'number' | 'tel' | 'email',
  label: string,
  readonly:boolean,
  hidden:boolean,
  formControlName: string,
  preffix_icon?:string,
  suffix_icon?:string,
  errorsMessages?:ErrorMsgs
}

export type FormField = SelectFormField | PasswordFormField | TextorNumberFormField
