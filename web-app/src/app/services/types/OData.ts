export type ODataEntity<T> = {
  "@odata.context": string;
  value: T;
};
