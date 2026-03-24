export type GameStatus = "pending" | "active" | "paused" | "finished" | "cancelled";

export type AuditEventType =
  | "session_created"
  | "session_started"
  | "number_drawn"
  | "session_paused"
  | "session_resumed"
  | "session_finished"
  | "session_reset";

export interface BingoAuditEvent {
  id: string;
  type: AuditEventType;
  timestamp: string;
  payload?: {
    drawOrder?: number;
    number?: number;
    sessionId?: string;
    previousSessionId?: string;
  };
}

export interface BingoSession {
  sessionId: string;
  createdAt: string;
  startedAt: string | null;
  endedAt: string | null;
  status: GameStatus;
  availableNumbers: number[];
  drawnNumbers: number[];
  currentNumber: number | null;
  auditLog: BingoAuditEvent[];
}
