-- Add Canadian compliance roadmap items
-- These represent missing features that customers are asking for

INSERT INTO "RoadmapItem" ("title", "description", "category", "status", "priority") VALUES
(
  'Server-side Consent Logging & Audit Trail',
  'Implement server-side consent logging to maintain audit trails for compliance records. Store who consented, when, and what they consented to for regulatory compliance.',
  'compliance',
  'planned',
  1
),
(
  'Geolocation Targeting (Quebec vs Other Provinces)',
  'Detect user location to apply different consent rules for Quebec (Law 25) vs other provinces. Quebec requires stricter consent mechanisms.',
  'compliance',
  'planned',
  2
),
(
  'Data Residency Documentation',
  'Document and display where user data is stored. Many Canadian organizations prefer Canadian data residency for compliance.',
  'compliance',
  'planned',
  3
),
(
  'Automatic Legal Updates System',
  'System to automatically update compliance features when Canadian privacy laws change. Keep users informed of new requirements.',
  'compliance',
  'planned',
  4
);
