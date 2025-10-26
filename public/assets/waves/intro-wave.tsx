"use client"

import { useAtom } from "jotai"
import { themeAtom } from "@/atoms/themeAtom"

const IntroWave = () => {
  const [theme] = useAtom(themeAtom)

  const fillColor = theme === "dark" ? "#1b1b1a" : "#F0F0F0"

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
      <path
        fill={fillColor}
        fillOpacity="1"
        d="M0,96L48,90.7C96,85,192,75,288,96C384,117,480,171,576,170.7C672,171,768,117,864,85.3C960,53,1056,43,1152,58.7C1248,75,1344,117,1392,138.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
      />
    </svg>
  )
}

export default IntroWave
