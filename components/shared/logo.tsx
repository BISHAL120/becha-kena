const LogoText = ({ className }: { className?: string }) => {
  return (
    <div className={className}>
      <div className="flex justify-center items-center gap-1">
        <h2 className="text-2xl font-bold ">
          BECHA{" "}
          <span className="text-green-500 bg-gradient-to-r from-green-500 to-green-600 bg-clip-text">
            KENA
          </span>
        </h2>
      </div>
    </div>
  );
};

export default LogoText;
