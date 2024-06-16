import { Metier } from "./metier";

export interface Formation {
    id?: number;
    ecole: string;
    title: string;
    fabrication: string;
    critereQualite: string;
    programF?: ProgramF;
    metiers?:Metier[];
  }
  
  export interface ProgramF {
    id?: number;
    title: string;
  }