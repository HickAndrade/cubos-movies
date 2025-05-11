export function InfoBlock({ title, children }: { title: string; children: React.ReactNode }) {
    return (
      <div className="bg-[#232225BF] rounded px-4 py-4 font-montserrat space-y-2">
        <h2 className="text-sm text-theme font-semibold">{title}</h2>
        {children}
      </div>
    )
  }
  