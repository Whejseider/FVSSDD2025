import { NextResponse } from "next/server";

export async function GET() {
    const res = await fetch("https://store.steampowered.com/api/featured");
    const data = await res.json();
    return NextResponse.json(data);
}
