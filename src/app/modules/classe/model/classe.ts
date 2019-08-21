import { Field } from "../../field/model/field";

export class Classe {
    id: number;

    className: String;
    
    description: String;

    invitationCode: String;

    field: Field;
}
