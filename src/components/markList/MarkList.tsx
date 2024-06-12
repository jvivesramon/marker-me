import { useAppSelector } from "../../store";
import MarkCard from "../MarkCard/MarkCard";
import "./MarkListStyles.scss";

const MarkList = (): React.ReactElement => {
  const { markersData } = useAppSelector((store) => store.markers);

  return (
    <section className="mark-list">
      <ul className="cards-list">
        {markersData.map((marker, position) => (
          <li key={position} className="cards-list__item">
            <MarkCard markProps={marker} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default MarkList;
