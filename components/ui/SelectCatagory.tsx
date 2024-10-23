import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "@/lib/data";

// Define the prop types for SelectCatagory
interface SelectCatagoryProps {
  onSkillSelect?: (value: string) => void; // Optional function that receives a string
}

export function SelectCatagory({ onSkillSelect }: SelectCatagoryProps) {
  const handleSelectChange = (value: string) => {
    if (onSkillSelect) {
      onSkillSelect(value);
    }
  };

  return (
    <Select onValueChange={handleSelectChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Categories</SelectLabel>
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.id}>
              {category.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
