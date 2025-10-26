'use client'

import ContactWave from "../../../public/assets/waves/contact-wave"
import Lanyard from "../Lanyard"
import Footer from "../layout/footer"
import ParticleBackground from "../layout/particle-background"
import ContactForm from "../ui/contact/contact-form"

const Contact = () => {
  return (
    <div id="contact" className="relative w-full bg-[var(--background)] text-[var(--foreground)] overflow-hidden flex items-center justify-center min-h-[80vh] gap-96 p-8">
      <div className="absolute top-0 z-30 left-0 w-full ">
        <ContactWave />
      </div>
      <ParticleBackground />
      <Lanyard />
      <div className="hidden md:block"></div>
      <ContactForm />
      <Footer />
    </div >
  )
}
export default Contact