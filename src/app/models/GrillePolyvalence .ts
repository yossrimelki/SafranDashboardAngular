// grille-polyvalence.model.ts
export class GrillePolyvalence {
    id: number;
    user: User;
    metier: Metier;
    niveau: number;
    filePath:String;
  }
  
  export class User {
    username:String;
    id: number;
    aleas: String;
    // Add other user properties if needed
  }
  
  export class Metier {
    id: number;
    title:String;
    // Add other metier properties if needed
  }
  