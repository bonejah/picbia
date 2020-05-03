export class Alert {

  constructor(
    public readonly alerType: AlertType,
    public readonly _message: string
  ) { }

}

export enum AlertType {
  SUCCESS,
  WARNING,
  DANGER,
  INFO
}
