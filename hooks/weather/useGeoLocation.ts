import { useState, useEffect } from "react";

import { getBrowserLocation } from "@/service/geolocation/browserLocation";

interface GeoState {
  lat: number | null;
  lon: number | null;
  loading: boolean;
  error: string | null;
}

export function useGeoWeather() {
  const [state, setState] = useState<GeoState>({
    lat: null,
    lon: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    async function loadLocation() {
      try {
        const location = await getBrowserLocation();

        setState({
          lat: location.lat,
          lon: location.lon,
          loading: false,
          error: null,
        });
      } catch (error) {
        setState({
          lat: null,
          lon: null,
          loading: false,
          error: error instanceof Error ? error.message : "Location Error",
        });
      }
    }
  }, []);

  function setCoordination(lat: number, lon: number) {
    setState({
      lat: lat,
      lon: lon,
      loading: false,
      error: null,
    });
  }

  return { state, setCoordination };
}
