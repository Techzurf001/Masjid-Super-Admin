import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createGallery, fetchGallery } from "../redux/gallerySlice";

const Gallery = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.gallery);

  const [form, setForm] = useState({
    imagePath: "",
    createdBy: "admin",
    status: true,
  });

  useEffect(() => {
    dispatch(fetchGallery());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = () => {
    dispatch(createGallery(form));
    setForm({
      imagePath: "",
      createdBy: "admin",
      status: true,
    });
  };

  return (
    <div className="flex flex-col items-center space-y-6 p-6">
      <div
        className="w-[400px] p-8 text-white font-sans flex flex-col gap-5"
        style={{
          background:
            "linear-gradient(#212121, #212121) padding-box, linear-gradient(145deg, transparent 35%, #e81cff, #40c9ff) border-box",
          border: "2px solid transparent",
          borderRadius: "16px",
        }}
      >
        <form className="flex flex-col gap-5">
          {/* Image Path */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="imagePath"
              className="text-[#717171] text-xs font-semibold"
            >
              Image Path (URL)
            </label>
            <input
              id="imagePath"
              name="imagePath"
              placeholder="Enter image URL"
              value={form.imagePath}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg text-white bg-transparent border border-[#414141] focus:outline-none focus:border-[#e81cff] placeholder:opacity-50"
            />
          </div>

          {/* Status */}
          <div className="flex items-center space-x-2">
            <input
              id="status"
              type="checkbox"
              name="status"
              checked={form.status}
              onChange={handleChange}
              className="w-4 h-4 text-[#e81cff] bg-transparent border-[#414141] focus:ring-[#e81cff] rounded"
            />
            <label htmlFor="status" className="text-sm text-white">
              Active
            </label>
          </div>

          {/* Submit */}
          <button
            type="button"
            onClick={handleSubmit}
            className="self-start px-4 py-3 bg-[#313131] text-[#717171] font-semibold text-sm border border-[#414141] rounded-md hover:bg-white hover:text-black hover:border-white transition-transform active:scale-95"
          >
            Upload
          </button>
        </form>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>

      <div className="columns-3 gap-4">
        {data.map((masjid, i) => (
          <div
            key={i}
            className="break-inside-avoid rounded overflow-hidden shadow-lg bg-[#1f1f1f] mb-4"
          >
            <img
              src={masjid.imagePath}
              alt={masjid.masjidName}
              className="w-full h-auto object-cover rounded-t"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
