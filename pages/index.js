import { useState } from "react";

export default function Home() {
  const [gender, setGender] = useState("");
  const [race, setRace] = useState("");
  const [trait, setTrait] = useState("");
  const [generatedName, setGeneratedName] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const characterImages = { // karakter images, sebenarnya tidak baik statis seperti ini
    male: {                 // namun dikarenakan api generate gambar semuanya berbayar, saya menggunakan metode
      elf: "/images/male_elf.webp", // ini saja karena hanya untuk sebuah website simple untuk kebutuhan tugas kuliah.
      human: "/images/male_human.jpeg",
      orc: "/images/male_orc.webp",
      dwarf: "/images/male_dwarf.jpg",
    },
    female: {
      elf: "/images/female_elf.jpg",
      human: "/images/female_human.jpg",
      orc: "/images/female_orc.jpg",
      dwarf: "/images/female_dwarf.webp",
    },
  };

  const generateName = (gender, race) => {  // generate nama, dan generate simple description.
    const maleNames = ["Aragorn", "Legolas", "Thorin"];
    const femaleNames = ["Arwen", "Galadriel", "Eowyn"];
    const races = {
      human: "dari kerajaan manusia",
      elf: "dari hutan peri",
      orc: "dari tanah kegelapan",
      dwarf: "dari pegunungan",
    };

    const baseName = // metode penguraian yang simple untuk memvalidasi gambar yang
      gender === "male" // akan digenerate sesuai dengan input gender dari si user.
        ? maleNames[Math.floor(Math.random() * maleNames.length)]
        : femaleNames[Math.floor(Math.random() * femaleNames.length)];

    return `${baseName}, ${races[race]}`;
  };

  const handleSubmit = async (e) => { // submit button.
    e.preventDefault();

    const name = generateName(gender, race);
    setGeneratedName(name);

    const imageUrl = characterImages[gender][race];
    setImageUrl(imageUrl);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-center mb-4">Fantasy Character Generator</h1>

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Gender:
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            required
          >
            <option value="">Pilih Gender</option>
            <option value="male">Pria</option>
            <option value="female">Wanita</option>
          </select>
        </label>

        <label className="block text-gray-700 text-sm font-bold mb-2">
          Ras:
          <select
            value={race}
            onChange={(e) => setRace(e.target.value)}
            className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            required
          >
            <option value="">Pilih Ras</option>
            <option value="human">Manusia</option>
            <option value="elf">Elf</option>
            <option value="orc">Orc</option>
            <option value="dwarf">Kurcaci</option>
          </select>
        </label>

        <label className="block text-gray-700 text-sm font-bold mb-2">
          Sifat:
          <input
            type="text"
            value={trait}
            onChange={(e) => setTrait(e.target.value)}
            placeholder="Contoh: Berani, Cerdas, Licik"
            className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            required
          />
        </label>

        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Generate Karakter
        </button>
      </form>

      {generatedName && (
        <div className="mt-6 p-4 bg-green-100 text-green-700 border-l-4 border-green-500">
          <p className="text-lg">
            Nama Karakter: <strong>{generatedName}</strong>
          </p>
          {imageUrl && (
            <img src={imageUrl} alt="Generated Fantasy Character" className="mt-4" />
          )}
        </div>
      )}
    </div>
  );
}
