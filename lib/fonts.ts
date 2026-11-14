import { Bricolage_Grotesque, DM_Sans } from "next/font/google";

export const display = Bricolage_Grotesque({ subsets: ["latin"], weight: ["600"], variable: "--font-disp", display: "swap" });
export const sans = DM_Sans({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-sans", display: "swap" });
