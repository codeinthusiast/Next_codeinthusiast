"use client";

import Link from "next/link";

import { Service } from "../utils/interface";
import { SlideIn, Transition } from "./ui/Transitions";
import { SectionHeading } from "./ui/Typography";
import { HoverImage } from "./ui/HoverImage";

interface ServiceProps {
  services: Service[];
}

function Services({ services }: ServiceProps) {
  return (
    <section className="px-2 py-20 relative" id="education" style={{marginLeft: "10%", marginRight: "10%"}}>
      <SectionHeading className="overflow-hidden tracking-tighter">
        <SlideIn className="text-[35px]">EDUCATION</SlideIn>
      </SectionHeading>
      <div className="mx-auto">
        {services.map((service) => (
          <Transition key={service._id}>
            <HoverImage
              heading={service.name}
              price={service.charge}
              imgSrc={service.image.url}
              subheading={service.desc}
            />
          </Transition>
        ))}
      </div>
      <Transition className="flex items-center py-10 md:hidden">
        <Link
          href={"#contact"}
          className="p-4 rounded-full border border-white/50"
        >
          <span>Discuss the project</span>
        </Link>
      </Transition>
    </section>
  );
}

export default Services;
