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

// Define the prop types for SelectScrollable
interface SelectScrollableProps {
  onSkillSelect?: (value: string) => void; // Optional function that receives a string
}

export function SelectScrollable({ onSkillSelect }: SelectScrollableProps) {
  const handleSelectChange = (value: string) => {
    if (onSkillSelect) {
      onSkillSelect(value);
    }
  };

  return (
    <Select onValueChange={handleSelectChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a technology" />
      </SelectTrigger>
      <SelectContent>
        {/* Front-end Category */}
        <SelectGroup>
          <SelectLabel>Front-end</SelectLabel>
          <SelectItem value="html">HTML</SelectItem>
          <SelectItem value="css">CSS</SelectItem>
          <SelectItem value="javascript">JavaScript</SelectItem>
          <SelectItem value="react">React</SelectItem>
          <SelectItem value="angular">Angular</SelectItem>
          <SelectItem value="vue">Vue.js</SelectItem>
        </SelectGroup>

        {/* Back-end Category */}
        <SelectGroup>
          <SelectLabel>Back-end</SelectLabel>
          <SelectItem value="nodejs">Node.js</SelectItem>
          <SelectItem value="django">Django</SelectItem>
          <SelectItem value="flask">Flask</SelectItem>
          <SelectItem value="express">Express.js</SelectItem>
          <SelectItem value="laravel">Laravel</SelectItem>
          <SelectItem value="ruby_on_rails">Ruby on Rails</SelectItem>
        </SelectGroup>

        {/* UI/UX Category */}
        <SelectGroup>
          <SelectLabel>UI/UX</SelectLabel>
          <SelectItem value="figma">Figma</SelectItem>
          <SelectItem value="adobe_xd">Adobe XD</SelectItem>
          <SelectItem value="sketch">Sketch</SelectItem>
          <SelectItem value="invision">InVision</SelectItem>
          <SelectItem value="framer">Framer</SelectItem>
        </SelectGroup>

        {/* Flutter Category */}
        <SelectGroup>
          <SelectLabel>Flutter</SelectLabel>
          <SelectItem value="flutter_setup">Flutter Setup</SelectItem>
          <SelectItem value="dart_basics">Dart Basics</SelectItem>
          <SelectItem value="flutter_widgets">Flutter Widgets</SelectItem>
          <SelectItem value="state_management">State Management</SelectItem>
          <SelectItem value="flutter_native_integration">
            Native Integration
          </SelectItem>
          <SelectItem value="flutter_animation">Animations in Flutter</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
