import { NextRequest, NextResponse } from "next/server";
import { forecasteWeatherData } from "@/service/weather/forecast";
import { normalizeWeatherData } from "@/service/weather/normalizer/geoNormalizer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const data = await forecasteWeatherData({
      lat: body.lat ?? 0,
      lon: body.lon ?? 0,
      units: body.units ?? "matric",
      lang: body.lang ?? "en",
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
