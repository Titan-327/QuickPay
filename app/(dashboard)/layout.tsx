import { JSX } from "react";
import { SidebarLayout} from "../../components/SideBar";
export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="bg-black">
    
        <SidebarLayout>
            {children}
            </SidebarLayout>
           
    </div>
  );
}

// Icons Fetched from https://heroicons.com/
