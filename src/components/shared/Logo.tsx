import logo from "../../assets/nobackleonardo.png";

const Logo = ({ width = 68 }) => {
  return (
    <div className={`flex items-center text-dark-100 w-[${width}px]`}>
      <img
        src={logo}
        alt="Logo"
        className="max-w-full h-auto rounded-full object-contain"
        width={width}
        height={width}
      />

      <p className="text-2xl max-sm:text-xl font-bold text-dark-100 dark:text-light-900 cursor-pointer">
        Miss<span className="text-primary-500">Meta</span>
      </p>
    </div>
  );
};

export default Logo;
