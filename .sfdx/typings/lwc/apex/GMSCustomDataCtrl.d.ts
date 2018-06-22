declare module "@apex/GMSCustomDataCtrl.getTables" {
  export function getTables(): Promise<any>;
}
declare module "@apex/GMSCustomDataCtrl.getTableColumns" {
  export function getTableColumns(param: {tableId: any}): Promise<any>;
}
declare module "@apex/GMSCustomDataCtrl.getTableRows" {
  export function getTableRows(param: {tableId: any}): Promise<any>;
}
