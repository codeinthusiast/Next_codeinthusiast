"use client";

import { AnimatePresence, motion } from "motion/react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import emailjs from 'emailjs-com';
import { About, SocialHandle } from "../utils/interface";
import { cn } from "../utils/cn";
import Link from "next/link";
import { SectionHeading, TextReveal } from "./ui/Typography";
import { SlideIn, Transition } from "./ui/Transitions";
import { Input, Textarea } from "./ui/Input";

interface ContactProps {
  email: string;
  social_handle: SocialHandle[];
  about: About;
}
const Contact = ({ email, social_handle, about }: ContactProps) => {
  const [status, setStatus] = useState<"SENDING" | "DONE" | "ERROR" | "IDLE">(
    "IDLE"
  );
  const [statusText, setStatusText] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("SENDING");
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData, 'YOUR_USER_ID')
      .then((response) => {
        setTimeout(() => {
          setStatus("DONE");
          setFormData({
            email: "",
            message: "",
            name: "",
            subject: "",
          });
          setStatusText("Message sent successfully!");
        }, 3000);
      })
      .catch((error) => {
        setStatus("ERROR");
        setStatusText("Error in sending message: " + error.message);
        console.error("Error sending message:", error.message);
      });
  };

  useEffect(() => {
    if (status === "DONE" || status === "ERROR") {
      const timer = setTimeout(() => {
        setStatus("IDLE");
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [status]);

  return (
    <div className="relative" id="contact" style={{ marginLeft: "10%", marginRight: "10%" }}>
      <AnimatePresence initial={false}>
        {status !== "IDLE" && (
          <motion.li
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            className={cn(
              "fixed top-4 right-4 p-2 px-4 w-[300px] z-50 h-16 rounded-xl bg-white flex items-center",
              status === "ERROR"
                ? "bg-red-500"
                : status === "DONE"
                  ? "bg-green-400"
                  : ""
            )}
          >
            <p className="text-black font-semibold">{statusText}</p>
          </motion.li>
        )}
      </AnimatePresence>
      <span className="blob size-1/2 absolute top-20 right-0 blur-[100px] -z-10" />
      <footer className="flex items-center justify-around md:px-8 px-2 py-4 text-sm mt-12">
        <Transition>
          <p className="text-[20px]">
            developed by @ Jason Roger&copy; {new Date().getFullYear()}
          </p>
        </Transition>
        <Transition>
          <p className="text-[20px]">
            jasonroger0512@yahoo.com
          </p>
        </Transition>
      </footer>
    </div>
  );
};

export default Contact;
