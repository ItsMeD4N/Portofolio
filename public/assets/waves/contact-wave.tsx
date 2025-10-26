"use client"

import { useAtom } from "jotai"
import { themeAtom } from "@/atoms/themeAtom"

const ContactWave = () => {
  const [theme] = useAtom(themeAtom)

  const fillColor = theme === "dark" ? "#1b1b1a" : "#F0F0F0"

  return (
    <svg
      fill={fillColor}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 320"
    >
      <path
        fill={fillColor}
        fillOpacity="1"
        d="M0,96L48,90.7C96,85,192,75,288,96C384,117,480,171,576,170.7C672,171,768,117,864,85.3C960,53,1056,43,1152,58.7C1248,75,1344,117,1392,138.7L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
      />
    </svg>
  )
}

export default ContactWave
