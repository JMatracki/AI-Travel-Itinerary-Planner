import React from "react";
import githubIcon from "../assets/images/github.png";
import githubIconWhite from "../assets/images/github_white.png";

interface FooterProps {
  darkMode: boolean;
  createdByLabel: string;
}

const Footer: React.FC<FooterProps> = ({ darkMode, createdByLabel }) => {
  return (
    <footer>
      <p>
        {createdByLabel} <span className="font-semibold">Jakub Matracki</span>
      </p>
      <a
        className="flex items-center gap-1 justify-center w-full"
        href="https://github.com/JMatracki"
        target="_blank"
      >
        <img
          className="h-[20px] w-[20px]"
          alt="github"
          src={darkMode ? githubIconWhite : githubIcon}
        />
        <span className="font-semibold">JMatracki</span>
      </a>
    </footer>
  );
};

export default Footer;
