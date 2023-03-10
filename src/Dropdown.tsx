interface Props {
  items: string[];
  onItemClick: (item: string) => void;
}

export default function Dropdown({ items, onItemClick }: Props) {
  function handleClick() {}
  return (
    <div className="dropdown-container">
      <ul className="dropdown">
        {items.map((item) => (
          <li
            className="dropdown-item"
            key={item}
            onClick={() => {
              onItemClick(item);
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
