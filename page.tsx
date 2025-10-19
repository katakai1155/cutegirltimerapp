import Timer from "@/components/timer"

export default function Home() {
  return (
    <main className="dark flex min-h-screen flex-col items-center justify-center p-6 bg-background relative">
      <div
        className="absolute inset-0 opacity-100"
        style={{
          backgroundImage: "url(/background.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="relative z-10 w-full">
        <Timer />
      </div>
    </main>
  )
}
