import { useAppSelector } from "../../store";
import MarkCard from "../MarkCard/MarkCard";
import "./MarkListStyles.scss";

interface MarkListProps {
  myRef: React.RefObject<HTMLElement>;
}

const MarkList = ({ myRef }: MarkListProps): React.ReactElement => {
  const { markersData } = useAppSelector((store) => store.markers);

  return (
    <section ref={myRef} className="mark-list">
      <span className="mark-list__divider"></span>
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
