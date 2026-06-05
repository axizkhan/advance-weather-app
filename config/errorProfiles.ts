export interface ErrorProfile {
  title: string;
  subtitle: string;
  message: string;
  severity: "low" | "medium" | "critical";
  iconType: "satellite" | "signal" | "shield" | "search";
}

export const ERROR_PROFILES: Record<string, ErrorProfile> = {
  GEOLOCATION_DENIED: {
    title: "Positioning Offline",
    subtitle: "Sensor Blocked",
    message:
      "Your browser denied access to local coordinate tracking. Please modify your browser permissions or manually type in a city search metric.",
    severity: "low",
    iconType: "signal",
  },
  API_TIMEOUT: {
    title: "Ground Station Timeout",
    subtitle: "Data Stream Disrupted",
    message:
      "The meteorological data stream failed to complete a handshake within our secure baseline window. Global servers could be experiencing brief latency spikes.",
    severity: "medium",
    iconType: "satellite",
  },
  DATA_CORRUPTION: {
    title: "Telemetry Checksum Error",
    subtitle: "Payload Invalid",
    message:
      "Data arrays successfully compiled over the wire but failed internal type safety verification loops. Contact system engineers if issues persist.",
    severity: "critical",
    iconType: "shield",
  },
  NOT_FOUND: {
    title: "Coordinates Missing",
    subtitle: "Uncharted Sector",
    message:
      "The specified atmospheric coordinate layout or dashboard view does not exist within the current system schema mappings.",
    severity: "low",
    iconType: "search",
  },
  DEFAULT: {
    title: "System Exception",
    subtitle: "Unexpected Intercept",
    message:
      "An unrecognized error occurred within the user client environment loop. System diagnostics have logged this execution sequence.",
    severity: "medium",
    iconType: "shield",
  },
};
