"use client";

import React, { useState, useEffect } from "react";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { ChevronRight } from "lucide-react";
import GridBackground from "@/components/ui/GridBackground";
import GradientOverlay from "@/components/ui/GradientOverlay";

const formFields = [
  { name: "name", label: "What's your name?", type: "text" },
  { name: "email", label: "What's your email?", type: "email" },
  { name: "company", label: "Where do you work?", type: "text" },
  { name: "role", label: "What's your role?", type: "text" },
];

export default function AnimatedForm() {
  const [currentField, setCurrentField] = useState(0);
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [direction, setDirection] = useState("forward");
  const [isAnimating, setIsAnimating] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (currentField < formFields.length - 1) {
      setDirection("forward");
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentField(currentField + 1);
      }, 200);
    } else {
      console.log("Form submitted:", formData);
      // Here you would typically send the data to your backend
    }
  };

  const handleBack = () => {
    if (currentField > 0) {
      setDirection("back");
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentField(currentField - 1);
      }, 200);
    }
  };

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  return (
    <div className="relative flex items-center justify-center min-h-screen">
      <GridBackground />
      <GradientOverlay />
      <div className="relative w-full max-w-md p-8 space-y-8 bg-gray-800/80 rounded-md border border-slate-50/20 shadow-sm">
        <h2 className="text-3xl tracking-[-2px] font-bold text-center text-white">
          fill the information below!
        </h2>
        <div
          className={`transition-all duration-200 transform ${
            isAnimating
              ? direction === "forward"
                ? "-translate-x-full opacity-0"
                : "translate-x-full opacity-0"
              : "translate-x-0 opacity-100"
          }`}
        >
          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            <div>
              <label
                htmlFor={formFields[currentField].name}
                className="flex justify-center text-md font-semibold tracking-tight text-gray-300 mb-1"
              >
                {formFields[currentField].label}
              </label>
              <Input
                type={formFields[currentField].type}
                name={formFields[currentField].name}
                id={formFields[currentField].name}
                onChange={handleInputChange}
                value={formData[formFields[currentField].name] || ""}
                className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Type your answer here"
                required
              />
            </div>
            <div className="flex gap-4">
              {currentField > 0 && (
                <Button onClick={handleBack} className="flex-1">
                  Back
                </Button>
              )}
              <Button
                onClick={handleNext}
                className={`flex justify-center items-center ${
                  currentField === 0 ? "w-full" : "flex-1"
                }`}
              >
                {currentField === formFields.length - 1 ? "Submit" : "Next"}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-500">
            Step {currentField + 1} of {formFields.length}
          </p>
        </div>
      </div>
    </div>
  );
}
