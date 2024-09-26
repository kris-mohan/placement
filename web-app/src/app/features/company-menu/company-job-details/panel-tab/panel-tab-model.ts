export type HiringPanel = {
  jobId: number;
  panelId: number;
  panelName: string;
  description: string;
  role: string;
  status: "Scheduled" | "Completed" | "Cancelled";
  candidateId?: number;
  feedback?: string;
};
