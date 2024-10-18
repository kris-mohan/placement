export type Calendarevent = {
    Id: number;
    EventStartDateTime?: Date;
    EventEndDateTime?: Date;
    EventType?: string; 
    EventDescription?: string; 
    OrgId?: number;
    CompanyId?: number;
    IsDeleted: boolean;
};
