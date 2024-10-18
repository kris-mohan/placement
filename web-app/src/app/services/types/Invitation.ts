export type Invitation = { 
    Id: number;
    InvitationTemplateId?: number;
    Recipients?: string;
    Cc?: string;
    Bcc?: string;
    From?: string;
    IsAccepted?: boolean;
    IsDeleted: boolean;
}