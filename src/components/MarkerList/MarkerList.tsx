import { useAppSelector } from "../../store";
import MarkCard from "../MarkerCard/MarkerCard";
import "./MarkerListStyles.scss";

interface MarkListProps {
  myRef: React.RefObject<HTMLElement>;
}

const MarkList = ({ myRef }: MarkListProps): React.ReactElement => {
  const { markersData } = useAppSelector((store) => store.markers);

  const eagerPosition = 4;

  return (
    <section ref={myRef} className="mark-list">
      <span className="mark-list__divider"></span>
      <ul className="cards-list">
        {markersData.map((marker, position) => (
          <li key={position} className="cards-list__item">
            <MarkCard
              markProps={marker}
              isLazy={position < eagerPosition ? "eager" : "lazy"}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default MarkList;
