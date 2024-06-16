import { Formation } from "./formation";

export interface ProgramF {
  id?: number;
  title: string;
  description: string;
  formations?: Formation[];
}
