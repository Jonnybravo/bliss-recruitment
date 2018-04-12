/*
* File that has the class definition for the data source results.
*/

export class Question{
  public id: number;
  public question: string;
  public image_url: string;
  public thumb_url: string;
  public published_at: Date;
  public choices: Choice[];
}

export class Choice {
  public choice: string;
  public votes: number;
}
