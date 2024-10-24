import { Companydatum } from "src/app/services/types/Companydatum";

export const getCompanyIndustryTypes = (company: Companydatum): string => {
  return company.Companyindustires?.map(
    (industry) => industry.Industry?.Type || ""
  )
    .filter((type) => type)
    .join(", ");
};
