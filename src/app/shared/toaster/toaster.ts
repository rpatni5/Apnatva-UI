export class Toaster {
  type: ToasterType;
  message: string;
  toasterId: string;
  keepAfterRouteChange: boolean;

  constructor(init?: Partial<Toaster>) {
    Object.assign(this, init);
  }
}

export enum ToasterType {
  Success,
  Error,
  Info,
  Warning
}
