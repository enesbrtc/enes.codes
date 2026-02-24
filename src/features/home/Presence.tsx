import Card from "../../../components/Card";
import { presence } from "../../../data/presence";

export default function Presence() {
  return (
    <Card>
      <div className="space-y-3 text-neutral-400">
        <p>Learning: {presence.learning}</p>
        <p>Building: {presence.building}</p>
        <p>Exploring: {presence.exploring}</p>
        <p>Now Playing: {presence.music}</p>
      </div>
    </Card>
  );
}