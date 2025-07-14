import React from "react";
import styles from "./HeroSection.module.css";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import cupImage from "../../../../app/assets/cup-with-headphone.png";

const HeroSection = () => {
  return (
    <div className="container mx-auto   mt-10">
      <div className={`${styles.banner} border-2 border-white rounded-3xl`}>
        <div className="grid grid-cols-2 gap-4 items-center">
          <div className="pl-12">
            <h1 className=" text-4xl font-bold leading-normal">
              Lorem ipsum dolor sit amet consectetur
            </h1>
            <p className="my-3">
              Save big this Black Friday with unbratable deals on tech, home
              essentials,fasshion,aand more?
            </p>
            <Button className="rounded-full mr-2">Buy Now</Button>
            <Button className="outline rounded-full">All Products</Button>
          </div>

          <div className="flex items-center justify-center">
            <Image src={cupImage} alt="cupImage" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
