import { useCategories } from "../hooks/useCategories";

export const EventList = () => {
  const { data: categories } = useCategories();

  return (
    <div className="flex flex-col">
      <select name="categories" className="border">
        <option value="">Event category</option>
        {categories?.map((row) => <option value={row}>{row}</option>)}
      </select>
      
    </div>
  )
}