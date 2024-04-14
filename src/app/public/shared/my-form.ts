import {Card} from "./card";
import {FormGroup} from "@angular/forms";

export interface MyForm {
    formGroup: FormGroup;
    cards: Card[];
}
