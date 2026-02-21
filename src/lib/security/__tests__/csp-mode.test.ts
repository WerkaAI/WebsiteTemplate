import { describe, expect, it } from "vitest";

import { resolveCspMode, type CspMode } from "../csp";

describe("resolveCspMode", () => {
  it("uses explicit env mode when provided", () => {
    const modes: CspMode[] = ["report-only", "dual", "enforce"];

    for (const mode of modes) {
      expect(resolveCspMode({ envMode: mode, lifecycleStage: "build" })).toBe(mode);
    }
  });

  it("maps lifecycle stage to default mode", () => {
    expect(resolveCspMode({ lifecycleStage: "build" })).toBe("report-only");
    expect(resolveCspMode({ lifecycleStage: "pre-release" })).toBe("dual");
    expect(resolveCspMode({ lifecycleStage: "release" })).toBe("enforce");
  });

  it("allows request override mode when env mode is not set", () => {
    expect(
      resolveCspMode({
        lifecycleStage: "build",
        requestOverrideMode: "dual",
      })
    ).toBe("dual");
  });
});
