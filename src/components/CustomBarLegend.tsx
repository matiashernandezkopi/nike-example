const CustomBarLegend = ({ payload }: any) => {
  // orden que vos querés
  const desiredOrder = ["speed", "response", "force"];

  const ordered = desiredOrder.map((key) =>
    payload.find((item: any) => item.dataKey === key)
  );

  return (
    <ul className="flex gap-4 mt-4 justify-center">
      {ordered.map(
        (entry: any) =>
          entry && (
            <li key={entry.dataKey} className="flex items-center gap-2">
              <span
                style={{
                  display: "inline-block",
                  width: 12,
                  height: 12,
                  background: entry.color,
                }}
              />
              <span className="text-gray-700 capitalize">{entry.dataKey}</span>
            </li>
          )
      )}
    </ul>
  );
};


export default CustomBarLegend