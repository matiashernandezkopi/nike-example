import CircleDiv from "../components/CircleDiv"
import { useGridColumns } from "../hooks/useGridColumns"

const Showcase = () => {
  const columns = useGridColumns();
  const itemsToShow = columns * 3; 

  return (
    <section 
      id="products"
      className="w-screen min-h-screen bg-[#0169a2] text-white px-4 py-10 flex justify-center">
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-12
          w-full
          place-items-center
        "
      >
        {Array.from({ length: itemsToShow }).map((_, i) => (
          <CircleDiv key={i} />
        ))}
      </div>
    </section>
  )
}

export default Showcase;
