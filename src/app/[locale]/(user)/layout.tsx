import {ReactNode} from "react";

export default function UserLayout({children}: { children: ReactNode }) {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="">
        {children}
      </div>
    </div>
  )
} 