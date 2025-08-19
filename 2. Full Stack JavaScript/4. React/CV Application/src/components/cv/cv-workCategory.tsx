import type { WorkCategory } from "../../utils/types";

export default function WorkCategory({ data }: { data: WorkCategory }) {
  return (
    <li>
      <h6>{data.categoryName}</h6>
      <ul>
        {data.items.map((item) => (
          <li key={item.id}>{item.label}</li>
        ))}
      </ul>
    </li>
  );
}
