import { Matiere } from "./matiere.model";

export class Professeur {
    _id?: string;
    id: number;
    nom: string;
    prenom: string;
    image: string;
    matiere: Matiere;
}