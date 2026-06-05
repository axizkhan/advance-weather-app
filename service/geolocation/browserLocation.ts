"use client";

export interface BrowserCoordination {
  lat: number;
  lon: number;
}

export async function getBrowserLocation(): Promise<BrowserCoordination> {
  return new Promise((res, rej) => {
    if (!navigator.geolocation) {
      rej(new Error("Geolocation is not supported"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        res({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        rej(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 1000 * 60 * 10,
      },
    );
  });
}
