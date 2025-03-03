import { ChangeEvent, useState } from "react";

const ThemeSwitcher = () => {
  const getInitialColor = () =>
    getComputedStyle(document.documentElement)
      .getPropertyValue("--color-primary")
      .trim() || "#51a2ff";
  const [color, setColor] = useState<string>(getInitialColor());

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
    document.documentElement.style.setProperty("--color-primary", color);
  };
  return (
    <div>
      <div className="relative w-[40px] h-[40px] rounded-full overflow-hidden border-2 border-gray-300">
        <input
          type="color"
          value={color}
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div
          className="w-full h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );
};

export default ThemeSwitcher;
