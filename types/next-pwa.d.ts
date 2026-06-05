declare module "next-pwa" {
  import { NextConfig } from "next";
  
  interface PWAConfig {
    dest?: string;
    disable?: boolean;
    register?: boolean;
    skipWaiting?: boolean;
    buildExcludes?: (RegExp | string)[];
    // add other config options as needed
    [key: string]: any;
  }
  
  export default function withPWAInit(config: PWAConfig): (nextConfig: NextConfig) => NextConfig;
}
