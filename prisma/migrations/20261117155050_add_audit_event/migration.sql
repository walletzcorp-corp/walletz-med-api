-- CreateEnum
CREATE TYPE "AuditResult" AS ENUM ('SUCCESS', 'DENIED', 'FAILURE');

-- CreateTable
CREATE TABLE "audit_event" (
    "event_id" TEXT NOT NULL,
    "tenant_id" TEXT NOT NULL,
    "unit_id" TEXT,
    "actor_id" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "object_type" TEXT NOT NULL,
    "object_id" TEXT NOT NULL,
    "result" "AuditResult" NOT NULL,
    "origin" TEXT,
    "correlation_id" TEXT NOT NULL,
    "changes" JSONB,
    "occurred_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_event_pkey" PRIMARY KEY ("event_id")
);

-- CreateIndex
CREATE INDEX "audit_event_tenant_id_occurred_at_idx" ON "audit_event"("tenant_id", "occurred_at");

-- CreateIndex
CREATE INDEX "audit_event_correlation_id_idx" ON "audit_event"("correlation_id");

CREATE OR REPLACE FUNCTION audit_event_imutavel() RETURNS trigger AS $$
BEGIN
  RAISE EXCEPTION 'audit_event é append-only: UPDATE e DELETE não são permitidos';
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER audit_event_sem_update_delete
BEFORE UPDATE OR DELETE ON "audit_event"
FOR EACH ROW EXECUTE FUNCTION audit_event_imutavel();
