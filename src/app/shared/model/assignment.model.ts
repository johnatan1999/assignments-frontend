import { Eleve } from "./eleve.model";
import { Matiere } from "./matiere.model";
import { Professeur } from "./professeur.model";

export class Assignment {
  _id?:string;
  id:number;
  nom:string;
  description: string;
  dateDeRendu:Date;
  note: number;
  remarque: string;
  rendu:boolean;
  eleve: Eleve;
  professeur: Professeur;
  dateUpdate: Date;
  enCours: Boolean;
}
