import countriesData from "@/data/countries";
import { useParams } from "react-router-dom";
import styles from "./singlePage.module.css";
import { CardDetails, CardTitle } from "@/data";

export const SingleCardContent = () => {
  const params = useParams();
  const { id } = params;
  const { lang } = useParams();
  const currentLang = lang === "en" || lang === "ka" ? lang : "en";
  const filteredData = countriesData.find((elem) => elem.id === id);

  return (
    <div className={styles.singleContainer}>
      <CardTitle title={filteredData?.name[currentLang]} />
      <img src={filteredData?.flag} alt="flag" />
      <CardDetails label={"Population"} content={filteredData?.population} />
      <CardDetails
        label={"Capital"}
        content={filteredData?.capital[currentLang]}
      />
    </div>
  );
};
