import { NextRequest, NextResponse } from "next/server";
import { autoGeoData } from "@/service/weather/geo";
import { normalizeWeatherData } from "@/service/weather/normalizer/geoNormalizer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const data = await autoGeoData({
      ip: body.ip ?? "auto",
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
