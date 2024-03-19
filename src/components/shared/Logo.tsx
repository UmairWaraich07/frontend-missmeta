import logo from "../../assets/nobackleonardo.png";

const Logo = ({ width = 60 }) => {
  return (
    <div className="flex items-center text-dark">
      <img
        src={logo}
        alt="Logo"
        className="max-w-full h-auto rounded-full object-contain"
        width={width}
        height={width}
      />

      <p className="h3-bold font-spaceGrotesk text-dark-100 dark:text-light-900 max-sm:hidden cursor-pointer">
        Miss Meta <span className="text-primary-500">Universe</span>
      </p>
    </div>
  );
};

export default Logo;
