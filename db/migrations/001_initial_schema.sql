-- Liftêd™ Neon/Postgres Schema
-- Migration 001: Initial schema
-- Run against both production and development Neon branches.
-- Production branch: main
-- Development branch: dev (create in Neon console before running)

-- ─────────────────────────────────────────────
-- Investor Access Requests
-- Created when a visitor submits the /investor-access form.
-- Does NOT automatically create a Firebase user or grant portal access.
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS investor_access_requests (
  id                   SERIAL PRIMARY KEY,
  first_name           TEXT NOT NULL,
  last_name            TEXT NOT NULL,
  email                TEXT NOT NULL UNIQUE,
  phone                TEXT,
  company              TEXT,
  professional_role    TEXT,
  interest_type        TEXT,          -- 'Potential Investor' | 'Strategic Partner' | 'Advisor' | 'Sponsor' | 'Other'
  how_heard            TEXT,
  why_interested       TEXT,
  investment_range     TEXT,
  consent_email        BOOLEAN DEFAULT false,
  consent_sms          BOOLEAN DEFAULT false,
  status               TEXT NOT NULL DEFAULT 'pending',  -- 'pending' | 'approved' | 'denied'
  highlevel_contact_id TEXT,
  highlevel_opp_id     TEXT,
  reviewed_at          TIMESTAMPTZ,
  reviewed_by_uid      TEXT,          -- Firebase UID of admin who reviewed
  firebase_uid         TEXT,          -- Set after account is created
  invitation_sent_at   TIMESTAMPTZ,
  created_at           TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_iar_email ON investor_access_requests (email);
CREATE INDEX IF NOT EXISTS idx_iar_status ON investor_access_requests (status);

-- ─────────────────────────────────────────────
-- Approved Investor Profiles
-- Created by Cloud Function after admin approval.
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS investor_profiles (
  id                   SERIAL PRIMARY KEY,
  firebase_uid         TEXT NOT NULL UNIQUE,
  email                TEXT NOT NULL UNIQUE,
  first_name           TEXT,
  last_name            TEXT,
  company              TEXT,
  professional_role    TEXT,
  interest_type        TEXT,
  investment_range     TEXT,
  access_request_id    INTEGER REFERENCES investor_access_requests(id),
  highlevel_contact_id TEXT,
  highlevel_opp_id     TEXT,
  approved_by_uid      TEXT,
  approved_at          TIMESTAMPTZ,
  invitation_sent_at   TIMESTAMPTZ,
  account_created_at   TIMESTAMPTZ,
  first_login_at       TIMESTAMPTZ,
  last_login_at        TIMESTAMPTZ,
  is_active            BOOLEAN NOT NULL DEFAULT true,
  created_at           TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_ip_firebase_uid ON investor_profiles (firebase_uid);
CREATE INDEX IF NOT EXISTS idx_ip_email ON investor_profiles (email);

-- ─────────────────────────────────────────────
-- Retailer Applications
-- Created when a visitor submits the /wholesale form.
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS retailer_applications (
  id                      SERIAL PRIMARY KEY,
  first_name              TEXT NOT NULL,
  last_name               TEXT NOT NULL,
  email                   TEXT NOT NULL UNIQUE,
  phone                   TEXT,
  business_name           TEXT NOT NULL,
  business_type           TEXT,
  website                 TEXT,
  location                TEXT,
  store_count             TEXT,
  current_brands          TEXT,
  why_lifted              TEXT,
  estimated_monthly_units TEXT,
  consent_email           BOOLEAN DEFAULT false,
  consent_sms             BOOLEAN DEFAULT false,
  status                  TEXT NOT NULL DEFAULT 'pending',
  highlevel_contact_id    TEXT,
  highlevel_opp_id        TEXT,
  reviewed_at             TIMESTAMPTZ,
  reviewed_by_uid         TEXT,
  firebase_uid            TEXT,
  invitation_sent_at      TIMESTAMPTZ,
  created_at              TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at              TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_ra_email ON retailer_applications (email);
CREATE INDEX IF NOT EXISTS idx_ra_status ON retailer_applications (status);

-- ─────────────────────────────────────────────
-- Wholesale Retailer Accounts
-- Created by Cloud Function after admin approval.
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS retailer_accounts (
  id                   SERIAL PRIMARY KEY,
  firebase_uid         TEXT NOT NULL UNIQUE,
  email                TEXT NOT NULL UNIQUE,
  first_name           TEXT,
  last_name            TEXT,
  business_name        TEXT,
  business_type        TEXT,
  website              TEXT,
  location             TEXT,
  application_id       INTEGER REFERENCES retailer_applications(id),
  highlevel_contact_id TEXT,
  approved_by_uid      TEXT,
  approved_at          TIMESTAMPTZ,
  invitation_sent_at   TIMESTAMPTZ,
  first_login_at       TIMESTAMPTZ,
  last_login_at        TIMESTAMPTZ,
  is_active            BOOLEAN NOT NULL DEFAULT true,
  created_at           TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─────────────────────────────────────────────
-- Portal Activity Log
-- Tracks all investor and retailer portal events.
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS portal_activity (
  id           BIGSERIAL PRIMARY KEY,
  firebase_uid TEXT NOT NULL,
  event_type   TEXT NOT NULL,  -- 'login' | 'page_view' | 'document_view' | 'document_download' | 'video_view' | 'booking_link_click' | 'call_scheduled'
  metadata     JSONB,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_pa_firebase_uid ON portal_activity (firebase_uid);
CREATE INDEX IF NOT EXISTS idx_pa_event_type ON portal_activity (event_type);
CREATE INDEX IF NOT EXISTS idx_pa_created_at ON portal_activity (created_at DESC);

-- ─────────────────────────────────────────────
-- Document Activity Log
-- Per-document view and download tracking.
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS document_activity (
  id           BIGSERIAL PRIMARY KEY,
  firebase_uid TEXT NOT NULL,
  document_id  INTEGER,
  event_type   TEXT NOT NULL,  -- 'view' | 'download'
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_da_firebase_uid ON document_activity (firebase_uid);
CREATE INDEX IF NOT EXISTS idx_da_document_id ON document_activity (document_id);

-- ─────────────────────────────────────────────
-- Investor Documents
-- Metadata for documents stored in Firebase Storage.
-- Actual files are in Firebase Storage, never in the Vite public directory.
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS investor_documents (
  id           SERIAL PRIMARY KEY,
  name         TEXT NOT NULL,
  description  TEXT,
  version      TEXT,
  file_path    TEXT NOT NULL,  -- Firebase Storage path, e.g. 'investor-portal/documents/pitch-deck-v3.pdf'
  file_size    BIGINT,
  mime_type    TEXT,
  sort_order   INTEGER DEFAULT 0,
  is_active    BOOLEAN NOT NULL DEFAULT true,
  uploaded_by  TEXT,           -- Firebase UID of admin who uploaded
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─────────────────────────────────────────────
-- HighLevel Sync Log
-- Tracks HighLevel contact and opportunity IDs for all records.
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS highlevel_sync (
  id                   SERIAL PRIMARY KEY,
  record_type          TEXT NOT NULL,  -- 'investor_request' | 'investor_profile' | 'retailer_application' | 'retailer_account'
  record_id            INTEGER NOT NULL,
  highlevel_contact_id TEXT,
  highlevel_opp_id     TEXT,
  last_synced_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  sync_status          TEXT DEFAULT 'ok',
  error_message        TEXT,
  created_at           TIMESTAMPTZ NOT NULL DEFAULT now()
);
