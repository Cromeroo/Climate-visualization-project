import React from "react";
import sectionsData from "../components/SectionData/sectionData";
import Section from "../components/SectionData/Section";
function proyecto() {
  return (
    <div>
      {sectionsData.map((section, index) => (
        <Section
          key={index}
          title={section.title}
          content={section.content}
          image={section.image}
        />
      ))}
    </div>
  );
}
export default proyecto;
