-- ── TABLE 1: Appointment bookings ──
CREATE TABLE appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  service TEXT NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'pending'
    CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  lang TEXT DEFAULT 'fr' CHECK (lang IN ('fr', 'ar')),
  ip_hash TEXT,
  user_agent TEXT
);

-- ── TABLE 2: Skin Advisor AI conversations ──
CREATE TABLE skin_advisor_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  session_id TEXT NOT NULL,
  lang TEXT DEFAULT 'fr',
  messages JSONB DEFAULT '[]',
  skin_type TEXT,
  main_concern TEXT,
  total_messages INTEGER DEFAULT 0,
  last_message_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── TABLE 3: Website visitor tracking ──
CREATE TABLE visitor_tracking (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  session_id TEXT NOT NULL,
  page TEXT NOT NULL,
  referrer TEXT,
  device_type TEXT CHECK (device_type IN ('mobile','tablet','desktop')),
  browser TEXT,
  lang TEXT,
  duration_seconds INTEGER,
  events JSONB DEFAULT '[]'
);

-- ── TABLE 4: Admin login sessions ──
CREATE TABLE admin_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  token_hash TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL
);

-- ── Row Level Security ──
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE skin_advisor_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE visitor_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_sessions ENABLE ROW LEVEL SECURITY;

-- Public can only INSERT appointments — no reads ever
CREATE POLICY "Public insert appointments"
  ON appointments FOR INSERT TO anon WITH CHECK (true);

-- Public can INSERT + UPDATE skin sessions
CREATE POLICY "Public insert skin sessions"
  ON skin_advisor_sessions FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Public update skin sessions"
  ON skin_advisor_sessions FOR UPDATE TO anon USING (true);

-- Public can INSERT visitor tracking
CREATE POLICY "Public insert visitor tracking"
  ON visitor_tracking FOR INSERT TO anon WITH CHECK (true);

-- ── Performance indexes ──
CREATE INDEX idx_appointments_created_at ON appointments(created_at DESC);
CREATE INDEX idx_appointments_status ON appointments(status);
CREATE INDEX idx_skin_sessions_id ON skin_advisor_sessions(session_id);
CREATE INDEX idx_visitor_session ON visitor_tracking(session_id);
