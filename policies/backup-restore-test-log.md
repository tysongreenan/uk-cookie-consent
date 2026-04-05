# Backup Restore Test Log

## COOKIE-BANNER.CA — Disaster Recovery Verification

---

### Test Details

| Field | Value |
|-------|-------|
| **Date** | 2026-03-28 |
| **Performed by** | Founder |
| **Source project** | greenantyson@gmail.com's Project (`bamunfrbhopzrjobowfx`) |
| **Source region** | us-east-2 |
| **Backup used** | 27 Mar 2026 11:35:54 (+0000) — Physical backup |
| **Restore method** | Supabase "Restore to new project" |
| **Target project** | backup-restore-test (`edicwejkffkkwyekaqta`) |
| **Target region** | us-east-2 |

### What Was Restored

- Database schema (all tables, views, procedures)
- All data and indexes
- Database roles, permissions, and users

### What Requires Manual Reconfiguration (not tested)

- Storage objects and settings
- Edge Functions
- Auth settings and API keys
- Database extensions and settings
- Read replicas

### Verification Results

| Check | Result |
|-------|--------|
| Project status | ACTIVE_HEALTHY |
| Total tables restored | 50 |
| Tables with data | 18 of 50 |
| Total rows verified | 751+ |
| Schema integrity | All tables present with correct structure |
| Data integrity | Row counts consistent with production |

### Key Tables Verified

| Table | Rows in Backup |
|-------|---------------|
| ab_events | 283 |
| banner_visitors | 118 |
| comments | 77 |
| SimpleBanners | 41 |
| User | 35 |
| sites | 31 |
| Team | 28 |
| TeamMember | 28 |
| banner_stats | 26 |
| chat_messages | 24 |
| RoadmapItem | 10 |
| subscriptions | 8 |
| Project | 8 |

### Conclusion

**PASS** — Backup restore completed successfully. All database schema, data, and indexes were transferred to the new project. Data integrity was verified by comparing table row counts. The restore process took approximately 5 minutes.

### Recommendations

1. Conduct this test at least annually (next test due: 2027-03-28)
2. Consider testing Edge Function and Auth settings restoration in a future test
3. Document any changes to the database schema that may affect future restores

### Post-Test Cleanup

- [ ] Delete the `backup-restore-test` project to avoid ongoing charges
- [ ] File this log with security documentation

---

*Next scheduled test: March 2027*
