export type HiringRound = {
  jobId: number;
  roundId: number;
  roundName: string;
  description: string;
  roundDate: Date;
  status: "Scheduled" | "Completed" | "Cancelled";
  candidateId?: number;
  feedback?: string;
};
