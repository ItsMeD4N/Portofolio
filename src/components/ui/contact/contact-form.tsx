import { Mail, MessageSquare, User, Send, CheckCircle } from "lucide-react";
import { useState, FormEvent } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../card";
import { MagicCard } from "../magic-card";
import { Button } from "../button";
import { Label } from "../label";
import { Input } from "../input";
import { Textarea } from "../textarea";

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Card className="p-0 w-full max-w-54 shadow-none border-none backdrop-blur-2xl bg-transparent">
        <MagicCard gradientColor="#D9D9D955" className="p-0">
          <CardHeader className="p-4 items-center grid place-items-center">
            <CheckCircle className="w-16 h-16 text-green-500 mb-2" />
            <CardTitle>Message Sent!</CardTitle>
            <CardDescription className="text-center">
              Thank you for reaching out. We'll get back to you soon.
            </CardDescription>
          </CardHeader>
        </MagicCard>
      </Card>
    );
  }

  return (
    <Card className="p-0 max-w-sm w-full shadow-none border-none backdrop-blur-2xl bg-transparent z-30">

      <MagicCard
        gradientColor="#D9D9D955"
        className="p-0"
      >
        <form onSubmit={handleSubmit}>
          <CardHeader className="border-b border-border p-4 [.border-b]:pb-4">
            <CardTitle>Let's Get in Touch</CardTitle>
            <CardDescription>
              Have a question or a project in mind? Drop a line.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 backdrop-blur-2xl bg-transparent">

            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input id="name" placeholder="Your Name" required className="pl-9" />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input id="email" type="email" placeholder="yourEmail@example.com" required className="pl-9" />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="message">Message</Label>
                <div className="relative">
                  <MessageSquare className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Textarea id="message" placeholder="Tell us how we can help..." required className="pl-9" />
                </div>
              </div>
            </div>

          </CardContent>
          <CardFooter className="p-4 border-t border-border">
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                "Sending..."
              ) : (
                <>
                  Send Message <Send className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </MagicCard>
    </Card >
  );
}

export default ContactForm;