# CSP Release Checklist (per project)

## 1) Build stage (implementation)
- [ ] `CSP_LIFECYCLE_STAGE=build`
- [ ] `CSP_MODE` unset (unless explicit override required)
- [ ] telemetry endpoint active (`/api/csp-report`)
- [ ] `npm run test`
- [ ] `npm run typecheck`

## 2) Pre-release stage (validation)
- [ ] `CSP_LIFECYCLE_STAGE=pre-release`
- [ ] `npm run test:csp`
- [ ] `npm run test:smoke`
- [ ] `npm run test:contact-form`
- [ ] review CSP violations from telemetry
- [ ] update allowlist if needed

## 3) Release stage (enforcement gate)
- [ ] `CSP_LIFECYCLE_STAGE=release`
- [ ] `npm run test:csp`
- [ ] `npm run test:smoke`
- [ ] no critical CSP regressions in telemetry
- [ ] release decision documented (meeting note / changelog)

## 4) Rollback procedure
- [ ] set `CSP_MODE=report-only`
- [ ] redeploy
- [ ] collect violations and update policy
- [ ] retry transition through `pre-release`
