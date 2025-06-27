import loadingCss from "./loading.module.css";

const Loading = () => {
  return (
    <div
      className={`${loadingCss.loader} h-[calc(100vh-100px)] w-full flex justify-center items-center`}
    >
      <svg className="w-40 h-40" viewBox="25 25 50 50">
        <circle r="20" cy="50" cx="50"></circle>
      </svg>
    </div>
  );
};

export default Loading;
