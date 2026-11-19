-- CreateTable
CREATE TABLE "audit_event" (
    "event_id" TEXT NOT NULL,
    "tenant_id" TEXT NOT NULL,
    "unit_id" TEXT,
    "actor" TEXT,
    "action" TEXT NOT NULL,
    "object" TEXT NOT NULL,
    "result" TEXT NOT NULL,
    "occurred_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "correlation_id" TEXT NOT NULL,

    CONSTRAINT "audit_event_pkey" PRIMARY KEY ("event_id")
);
