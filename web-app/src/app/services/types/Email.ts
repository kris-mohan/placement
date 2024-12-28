export type Email = {
  Id: number;
  To: string;
  Cc: string;
  Bcc: string;
  Subject: string;
  IsSent: boolean;
  Body: string;
  CreatedAt: string;
  SentAt: string;
};

export type PostEmail = {
  Id: number;
  To: string;
  Cc: string;
  Bcc: string;
  Subject: string;
  IsSent: boolean;
  Body: string;
  CreatedAt: string;
  SentAt: string;
};
