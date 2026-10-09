'use client'

import { useEffect, useRef, useState } from "react"
import AsciiCore from "../ascii-core"
import Footer from "../layout/footer"
import ContactForm from "../ui/contact/contact-form"
import { Prompt, TerminalWindow } from "../ui/terminal"

const Contact = () => {
  const ref = useRef<HTMLElement>(null)
  const [near, setNear] = useState(false)

  // Second WebGL scene; only boot it when contact is close.
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { rootMargin: "300px" })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  // The ASCII window is md+ only; rendering it while hidden (0×0) crashes the ASCII effect.
  const [wide, setWide] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)")
    const update = () => setWide(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  return (
    <section ref={ref} id="contact" className="relative w-full overflow-hidden pt-24">
      <div className="grid-floor" aria-hidden />
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <Prompt path="~/contact" cmd="ssh hello@ItsMeDAN" />
      </div>
      <div className="relative mx-auto grid max-w-6xl items-center gap-8 px-6 py-12 md:grid-cols-2">
        <TerminalWindow title="~/core — render --ascii" className="hidden md:block">
          {near && wide && <AsciiCore />}
        </TerminalWindow>
        <ContactForm />
      </div>
      <Footer />
    </section>
  )
}
export default Contact
