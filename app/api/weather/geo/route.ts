import { NextRequest, NextResponse } from "next/server";
import { autoGeoData } from "@/service/weather/geo";
import { normalizeWeatherData } from "@/service/weather/normalizer/geoNormalizer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    let clientIp = body.ip ?? "auto";

    // Intercept "auto" and extract the real client IP from headers
    if (clientIp === "auto") {
      const forwardedFor = request.headers.get("x-forwarded-for");
      const realIp = request.headers.get("x-real-ip");

      if (forwardedFor) {
        // x-forwarded-for can be a comma-separated list; the first one is the original client
        clientIp = forwardedFor.split(",")[0].trim();
      } else if (realIp) {
        clientIp = realIp;
      }

      // If developing locally, localhost IPs will fail external geolocation APIs, so revert to "auto"
      if (clientIp === "::1" || clientIp === "127.0.0.1" || clientIp === "localhost") {
        clientIp = "auto";
      }
    }

    const data = await autoGeoData({
      ip: clientIp,
      days: body.days ?? 7,
      ai: body.ai ?? false,
    });

    return NextResponse.json(normalizeWeatherData(data));
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch weather" },
      { status: 500 },
    );
  }
}
