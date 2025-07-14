import styles from "./banner.module.css";
const ProductBanner = ({ title, path }: { title: string; path: string }) => {
  return (
    <div
      className={`${styles.banner} border-2 border-black rounded-3xl mt-10 flex justify-center items-center`}
    >
      <div className="text-center">
        <h1 className="font-bold text-2xl leading-10">{title}</h1>
        <p>{path}</p>
      </div>
    </div>
  );
};

export default ProductBanner;
