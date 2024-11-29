export type ODataEntity<T> = {
  "@odata.context": string;
  "@odata.count": number;
  value: T;
};
