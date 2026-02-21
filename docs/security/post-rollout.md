# CSP Rollout Log

_Use this document to capture telemetry and decisions during and after CSP enforcement._

## Deployment Timeline
- **Report-Only Start:** 2026-02-21 (`CSP_LIFECYCLE_STAGE=build`)
- **Pre-release Dual Mode:** 2026-02-21 (`CSP_LIFECYCLE_STAGE=pre-release`)
- **Enforcement Switch (gate ready):** 2026-02-21 (`CSP_LIFECYCLE_STAGE=release` validated in test:csp)
- **Review Owner:** Platform + Security

## Violation Summary
| Date | Endpoint | Directive | External URL | Action Taken |
| --- | --- | --- | --- | --- |
| 2026-02-21 | `/api/csp-report` | baseline telemetry enabled | _n/a_ | endpoint uruchomiony, log sanitized |

## Allow-List Adjustments
- baseline bez zmian po walidacji (`test:csp`, `test:smoke`)

## Follow-Up Tasks
- [x] Validate Turnstile calls after enforcement.
- [x] Confirm baseline smoke routes remain green after lifecycle rollout.
- [ ] Confirm marketing analytics (if added) emit no CSP noise.

## Lessons Learned
- lifecycle gate per project redukuje blokery DX i utrzymuje security gate na końcu release.
