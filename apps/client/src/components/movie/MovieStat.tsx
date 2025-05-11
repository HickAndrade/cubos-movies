export function MovieStat({ label, value }: { label: string; value: any }) {
    return (
      <div className="bg-[#f2eff3de] dark:bg-[#232225BF] w-full font-montserrat rounded px-4 py-4 flex flex-col justify-center">
        <p className="text-xs dark:text-mauve-11 uppercase leading-none mb-2 font-bold">{label}</p>
        <p className="text-sm dark:text-theme leading-none font-bold">{value}</p>
      </div>
    )
  }