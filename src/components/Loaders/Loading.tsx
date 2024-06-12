import "./LoadingStyles.scss";

const Loading = (): React.ReactElement => {
  return (
    <div className="loading-container" aria-label="loading">
      <span className="loader"></span>
    </div>
  );
};

export default Loading;
