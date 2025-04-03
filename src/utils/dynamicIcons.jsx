import React, { useState, useEffect } from "react";

const iconSets = {
  ai: () => import("react-icons/ai"),
  bs: () => import("react-icons/bs"),
  bi: () => import("react-icons/bi"),
  di: () => import("react-icons/di"),
  fi: () => import("react-icons/fi"),
  fa: () => import("react-icons/fa"),
  gi: () => import("react-icons/gi"),
  go: () => import("react-icons/go"),
  hi: () => import("react-icons/hi"),
  io: () => import("react-icons/io"),
  md: () => import("react-icons/md"),
  ri: () => import("react-icons/ri"),
  si: () => import("react-icons/si"),
  ti: () => import("react-icons/ti"),
  vs: () => import("react-icons/vsc"),
  wi: () => import("react-icons/wi"),
  cg: () => import("react-icons/cg"),
  gr: () => import("react-icons/gr"),
  im: () => import("react-icons/im"),
  rx: () => import("react-icons/rx"),
  tb: () => import("react-icons/tb"),
  fc: () => import("react-icons/fc"),
  pi: () => import("react-icons/pi"),
};

export const Icons = ({ iconName, ...props }) => {
  const [Icon, setIcon] = useState(null);

  useEffect(() => {
    const loadIcon = async () => {
      try {
        const prefix = iconName.substring(0, 2).toLowerCase();
        const importSet = iconSets[prefix];

        if (!importSet) {
          console.warn(`Icon set "${prefix}" not supported`);
          return;
        }

        const module = await importSet();
        setIcon(() => module[iconName] || module["FaQuestionCircle"]);
      } catch (error) {
        console.error("Error loading icon:", error);
      }
    };

    loadIcon();
  }, [iconName]);

  return Icon ? <Icon {...props} /> : <span>Loading...</span>;
};
